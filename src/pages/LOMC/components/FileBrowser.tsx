import { useTheme } from '@/context/ThemeContext';
import { mockFileStructure } from '@/mocks/fileStructures';
import type { FileNode } from '@/types/fileNode';
import { useState } from 'react';

type FileBrowserProps = {
  onFileSelect: (filePath: string | string[], parentDir?: string) => void;
};

export const FileBrowser = ({ onFileSelect }: FileBrowserProps) => {
  const { isDarkTheme } = useTheme();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set([mockFileStructure[0].path]));
  const [selectedPaths, setSelectedPaths] = useState<Set<string>>(new Set());

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const getAllFilesInFolder = (node: FileNode): string[] => {
    const files: string[] = [];
    
    if (node.type === 'file') {
      files.push(node.path);
    } else if (node.children) {
      for (const child of node.children) {
        files.push(...getAllFilesInFolder(child));
      }
    }
    
    return files;
  };

  const isNodeSelected = (node: FileNode): boolean => {
    if (selectedPaths.has(node.path)) return true;
    
    // Check if any parent is selected
    for (const selectedPath of selectedPaths) {
      if (node.path.startsWith(selectedPath + '/')) {
        return true;
      }
    }
    return false;
  };

  const handleCheckboxClick = (e: React.MouseEvent, node: FileNode) => {
    e.stopPropagation();
    
    // Check if clicked node is within current selection tree
    const isWithinCurrentTree = (clickedPath: string): boolean => {
      if (selectedPaths.size === 0) return false;
      
      for (const selectedPath of selectedPaths) {
        // Check if clicked node is a parent of selected
        if (selectedPath.startsWith(clickedPath + '/')) return true;
        // Check if clicked node is a child of selected
        if (clickedPath.startsWith(selectedPath + '/')) return true;
        // Check if they're the same
        if (clickedPath === selectedPath) return true;
      }
      return false;
    };
    
    const newSelected = new Set<string>();
    
    if (selectedPaths.has(node.path)) {
      // Unselect this node
      selectedPaths.forEach(path => {
        if (path !== node.path && !path.startsWith(node.path + '/')) {
          newSelected.add(path);
        }
      });
    } else {
      // Check if this selection is within the same tree
      if (selectedPaths.size > 0 && !isWithinCurrentTree(node.path)) {
        // New selection is outside current tree, clear all and start fresh
        newSelected.add(node.path);
      } else {
        // Within same tree, keep existing selections
        selectedPaths.forEach(path => newSelected.add(path));
        newSelected.add(node.path);
      }
    }
    
    setSelectedPaths(newSelected);
    
    // Extract parent directory from first selected path
    let parentDir: string | undefined;
    if (newSelected.size > 0) {
      const firstPath = Array.from(newSelected)[0];
      const pathWithoutLomc = firstPath.replace(/^\/LOMC\//, '');
      parentDir = pathWithoutLomc.split('/')[0];
      console.log('Parent directory:', parentDir);
    }
    
    // Collect all selected files
    const allSelectedFiles: string[] = [];
    newSelected.forEach(path => {
      // Find the node for this path
      const findNode = (nodes: FileNode[]): FileNode | null => {
        for (const n of nodes) {
          if (n.path === path) return n;
          if (n.children) {
            const found = findNode(n.children);
            if (found) return found;
          }
        }
        return null;
      };
      
      const node = findNode(mockFileStructure);
      if (node) {
        if (node.type === 'file') {
          allSelectedFiles.push(node.path);
        } else {
          allSelectedFiles.push(...getAllFilesInFolder(node));
        }
      }
    });
    
    onFileSelect(allSelectedFiles.length > 0 ? allSelectedFiles : [], parentDir);
  };

  const handleNodeClick = (node: FileNode) => {
    if (node.type === 'folder') {
      toggleFolder(node.path);
    }
  };

  const renderNode = (node: FileNode, level: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = isNodeSelected(node);
    const isDirectlySelected = selectedPaths.has(node.path);

    return (
      <div key={node.path}>
        <div
          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
            isSelected
              ? isDarkTheme
                ? 'bg-mhfd-blue/20 text-gray-100'
                : 'bg-mhfd-blue/10 text-gray-900'
              : isDarkTheme
              ? 'hover:bg-gray-700 text-gray-200'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={() => handleNodeClick(node)}
        >
          {/* Checkbox */}
          <div
            className="flex items-center justify-center w-4 h-4 shrink-0"
            onClick={(e) => handleCheckboxClick(e, node)}
          >
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
              isDirectlySelected
                ? 'bg-mhfd-blue border-mhfd-blue'
                : isDarkTheme
                ? 'border-gray-500 hover:border-gray-400'
                : 'border-gray-400 hover:border-gray-500'
            }`}>
              {isDirectlySelected && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>

          {node.type === 'folder' && (
            <svg
              className={`w-4 h-4 shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          )}
          {node.type === 'folder' ? (
            <svg className="w-4 h-4 shrink-0 text-mhfd-blue" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          )}
          <span className="text-sm truncate">{node.name}</span>
        </div>
        {node.type === 'folder' && isExpanded && hasChildren && (
          <div>
            {node.children!.map(child => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {mockFileStructure.map(node => renderNode(node))}
    </div>
  );
};
