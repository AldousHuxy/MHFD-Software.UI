import { createContext, useContext, useState, type ReactNode } from 'react';
import { RiGeminiLine } from "react-icons/ri";
import { RiClaudeFill } from "react-icons/ri";
import { SiOpenai } from "react-icons/si";
import { GoCopilot } from "react-icons/go";
import { FaXTwitter } from "react-icons/fa6";
import type { Agent } from '@/types/agent';

type AgentProviderProps = { children: ReactNode };

type AgentContext = {
    agents: Agent[]
    updateAgents: (agent: Agent) => void
    selectedAgent: Agent
    changeSelectedAgent: (agent: Agent) => void
};

const AgentContext = createContext({} as AgentContext);

export const useAgent = () => useContext(AgentContext);

export const AgentProvider = ({ children }: AgentProviderProps) => {
    const [agents, setAgents] = useState<Agent[]>([
        {
            id: 'gpt',
            name: 'Chat-GPT 5 Nano',
            model: 'gpt-5-nano',
            shortName: 'GPT',
            icon: SiOpenai({ className: 'w-5 h-5' }),
        },
        {
            id: 'copilot',
            name: 'Copilot',
            model: 'copilot',
            shortName: 'Copilot',
            icon: GoCopilot({ className: 'w-5 h-5' }),
            disabled: true,
        },
        {
            id: 'gemini',
            name: 'Gemini 3 Pro',
            model: 'gemini-3-pro',
            shortName: 'Gemini',
            icon: RiGeminiLine({ className: 'w-5 h-5' }),
            disabled: true,
        },
        {
            id: 'claude',
            name: 'Claude Sonnet 4.5',
            model: 'claude-sonnet-4-5',
            shortName: 'Claude',
            icon: RiClaudeFill({ className: 'w-5 h-5' }),
            disabled: true,
        },
        {
            id: 'grok',
            name: 'Grok Code Fast 1',
            model: 'grok-code-fast-1',
            shortName: 'Grok',
            icon: FaXTwitter({ className: 'w-5 h-5' }),
            disabled: true,
        },
    ]);

    const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);

    const updateAgents = (newAgent: Agent): void => {
        setAgents(prevAgents => [...prevAgents, newAgent]);
    }

    const changeSelectedAgent = (agent: Agent) => {
        setSelectedAgent(agent);
    }

    return (
        <AgentContext.Provider value={{
            agents,
            updateAgents,
            selectedAgent,
            changeSelectedAgent
        }}>
            {children}
        </AgentContext.Provider>
    );
};
