import { json2csv, csv2json } from 'json-2-csv';
import { designInfoSchema, type DesignInfo, type Culvert } from '@/schemas/designInfo.schema';

type Excel = string;

export const FileUtils = {
    designInfoToExcel: (designInfo: DesignInfo): Excel => {
        try {
            // Validate before converting
            designInfoSchema.parse(designInfo);
            
            // Flatten the structure for CSV format
            const flattenedRows: any[] = [];
            
            designInfo.culverts?.forEach((culvert: Culvert) => {
                const baseRow = {
                    projectName: designInfo.projectName,
                    projectId: designInfo.projectId,
                    culvertType: culvert.type,
                    culvertId: culvert.type === 'pipe' ? culvert.pipeId : culvert.boxId,
                };
                
                // Flatten conduit flow data
                const conduitFlowData = culvert.conduitFlow ? {
                    ...('pipeInvertSlope' in culvert.conduitFlow && { pipeInvertSlope: culvert.conduitFlow.pipeInvertSlope }),
                    ...('pipeManningsNValue' in culvert.conduitFlow && { pipeManningsNValue: culvert.conduitFlow.pipeManningsNValue }),
                    ...('pipeDiameter' in culvert.conduitFlow && { pipeDiameter: culvert.conduitFlow.pipeDiameter }),
                    ...('boxConduitInvertSlope' in culvert.conduitFlow && { boxConduitInvertSlope: culvert.conduitFlow.boxConduitInvertSlope }),
                    ...('boxManningsNValue' in culvert.conduitFlow && { boxManningsNValue: culvert.conduitFlow.boxManningsNValue }),
                    ...('boxWidth' in culvert.conduitFlow && { boxWidth: culvert.conduitFlow.boxWidth }),
                    ...('boxHeight' in culvert.conduitFlow && { boxHeight: culvert.conduitFlow.boxHeight }),
                    designDischarge: culvert.conduitFlow.designDischarge,
                } : {};
                
                // Flatten culvert rating data
                const culvertRatingData = culvert.culvertRating ? {
                    ...('barrelDiameter' in culvert.culvertRating && { barrelDiameter: culvert.culvertRating.barrelDiameter }),
                    ...('barrelHeight' in culvert.culvertRating && { barrelHeight: culvert.culvertRating.barrelHeight }),
                    ...('barrelWidth' in culvert.culvertRating && { barrelWidth: culvert.culvertRating.barrelWidth }),
                    ...('numOfBarrels' in culvert.culvertRating && { numOfBarrels: culvert.culvertRating.numOfBarrels }),
                    ...('inletElevationAtCulvertInlet' in culvert.culvertRating && { inletElevationAtCulvertInlet: culvert.culvertRating.inletElevationAtCulvertInlet }),
                    ...('isSlope' in culvert.culvertRating && { isSlope: culvert.culvertRating.isSlope }),
                    ...('outletElevationOrSlope' in culvert.culvertRating && { outletElevationOrSlope: culvert.culvertRating.outletElevationOrSlope }),
                    ...('culvertLength' in culvert.culvertRating && { culvertLength: culvert.culvertRating.culvertLength }),
                    ...('manningsRoughness' in culvert.culvertRating && { manningsRoughness: culvert.culvertRating.manningsRoughness }),
                    ...('bendLossCoefficient' in culvert.culvertRating && { bendLossCoefficient: culvert.culvertRating.bendLossCoefficient }),
                    ...('exitLossCoefficient' in culvert.culvertRating && { exitLossCoefficient: culvert.culvertRating.exitLossCoefficient }),
                    inletEdgeType: culvert.culvertRating.inletEdgeType,
                } : {};
                
                // Flatten HW outlet protection data
                const hwOutletData = culvert.hwOutletProtection ? {
                    hwDesignDischarge: culvert.hwOutletProtection.designDischarge,
                    ...('tailwaterSurfaceElevation' in culvert.hwOutletProtection && { tailwaterSurfaceElevation: culvert.hwOutletProtection.tailwaterSurfaceElevation }),
                    ...('maxAllowableChannelVelocity' in culvert.hwOutletProtection && { maxAllowableChannelVelocity: culvert.hwOutletProtection.maxAllowableChannelVelocity }),
                } : {};
                
                // Flatten profile data
                const profileData = culvert.profile ? {
                    profileBarrelDiameterOrHeight: culvert.profile.barrelDiameterOrHeight,
                    profileBarrelLength: culvert.profile.barrelLength,
                    profileBarrelInvertSlope: culvert.profile.barrelInvertSlope,
                    downstreamInvertElevation: culvert.profile.downstreamInvertElevation,
                    downstreamTopEmbankmentElevation: culvert.profile.downstreamTopEmbankmentElevation,
                    upstreamTopEmbankmentElevation: culvert.profile.upstreamTopEmbankmentElevation,
                    designHeadwaterDepth: culvert.profile.designHeadwaterDepth,
                    tailwaterDepth: culvert.profile.tailwaterDepth,
                } : {};
                
                flattenedRows.push({
                    ...baseRow,
                    ...conduitFlowData,
                    ...culvertRatingData,
                    ...hwOutletData,
                    ...profileData
                });
            });
            
            // Convert to CSV with custom headers
            const excel = json2csv(flattenedRows, {
                keys: [
                    { field: 'projectName', title: 'Project Name' },
                    { field: 'projectId', title: 'Project ID' },
                    { field: 'culvertType', title: 'Culvert Type' },
                    { field: 'culvertId', title: 'Culvert ID' },
                    { field: 'pipeInvertSlope', title: 'Pipe Invert Slope' },
                    { field: 'pipeManningsNValue', title: 'Pipe Mannings N Value' },
                    { field: 'pipeDiameter', title: 'Pipe Diameter' },
                    { field: 'boxConduitInvertSlope', title: 'Box Conduit Invert Slope' },
                    { field: 'boxManningsNValue', title: 'Box Mannings N Value' },
                    { field: 'boxWidth', title: 'Box Width' },
                    { field: 'boxHeight', title: 'Box Height' },
                    { field: 'designDischarge', title: 'Design Discharge' },
                    { field: 'barrelDiameter', title: 'Barrel Diameter' },
                    { field: 'barrelHeight', title: 'Barrel Height' },
                    { field: 'barrelWidth', title: 'Barrel Width' },
                    { field: 'numOfBarrels', title: 'Number of Barrels' },
                    { field: 'inletElevationAtCulvertInlet', title: 'Inlet Elevation at Culvert Inlet' },
                    { field: 'isSlope', title: 'Is Slope' },
                    { field: 'outletElevationOrSlope', title: 'Outlet Elevation or Slope' },
                    { field: 'culvertLength', title: 'Culvert Length' },
                    { field: 'manningsRoughness', title: 'Mannings Roughness' },
                    { field: 'bendLossCoefficient', title: 'Bend Loss Coefficient' },
                    { field: 'exitLossCoefficient', title: 'Exit Loss Coefficient' },
                    { field: 'inletEdgeType', title: 'Inlet Edge Type' },
                    { field: 'hwDesignDischarge', title: 'HW Design Discharge' },
                    { field: 'tailwaterSurfaceElevation', title: 'Tailwater Surface Elevation' },
                    { field: 'maxAllowableChannelVelocity', title: 'Max Allowable Channel Velocity' },
                    { field: 'profileBarrelDiameterOrHeight', title: 'Profile Barrel Diameter or Height' },
                    { field: 'profileBarrelLength', title: 'Profile Barrel Length' },
                    { field: 'profileBarrelInvertSlope', title: 'Profile Barrel Invert Slope' },
                    { field: 'downstreamInvertElevation', title: 'Downstream Invert Elevation' },
                    { field: 'downstreamTopEmbankmentElevation', title: 'Downstream Top Embankment Elevation' },
                    { field: 'upstreamTopEmbankmentElevation', title: 'Upstream Top Embankment Elevation' },
                    { field: 'designHeadwaterDepth', title: 'Design Headwater Depth' },
                    { field: 'tailwaterDepth', title: 'Tailwater Depth' }
                ]
            });
            
            return excel;
        } catch (error) {
            console.error('Error converting design info to CSV:', error);
            throw error;
        }
    },
    excelToDesignInfo: (excel: Excel): DesignInfo => {
        try {
            const rows = csv2json(excel);
            
            if (rows.length === 0) {
                throw new Error('CSV file is empty');
            }
            
            // Extract project info from first row
            const firstRow = rows[0] as any;
            const projectName = firstRow.projectName as string;
            const projectId = Number(firstRow.projectId);
            
            // Group rows by culvert
            const culverts: Culvert[] = rows.map((row: any) => {
                const culvertType = row.culvertType as 'pipe' | 'box';
                const culvertId = Number(row.culvertId);
                
                const baseCulvert = {
                    type: culvertType,
                    ...(culvertType === 'pipe' ? { pipeId: culvertId } : { boxId: culvertId }),
                };
                
                // Reconstruct conduit flow
                const conduitFlow = row.designDischarge ? {
                    type: culvertType,
                    ...(culvertType === 'pipe' ? {
                        pipeInvertSlope: Number(row.pipeInvertSlope),
                        pipeManningsNValue: Number(row.pipeManningsNValue),
                        pipeDiameter: Number(row.pipeDiameter),
                    } : {
                        boxConduitInvertSlope: Number(row.boxConduitInvertSlope),
                        boxManningsNValue: Number(row.boxManningsNValue),
                        boxWidth: Number(row.boxWidth),
                        boxHeight: Number(row.boxHeight),
                    }),
                    designDischarge: Number(row.designDischarge),
                } : undefined;
                
                // Reconstruct culvert rating
                const culvertRating = row.inletEdgeType ? {
                    type: culvertType,
                    ...(culvertType === 'pipe' ? {
                        barrelDiameter: Number(row.barrelDiameter),
                    } : {
                        barrelHeight: Number(row.barrelHeight),
                        barrelWidth: Number(row.barrelWidth),
                        numOfBarrels: Number(row.numOfBarrels),
                        inletElevationAtCulvertInlet: Number(row.inletElevationAtCulvertInlet),
                        isSlope: row.isSlope === 'true' || row.isSlope === true,
                        outletElevationOrSlope: Number(row.outletElevationOrSlope),
                        culvertLength: Number(row.culvertLength),
                        manningsRoughness: Number(row.manningsRoughness),
                        bendLossCoefficient: Number(row.bendLossCoefficient),
                        exitLossCoefficient: Number(row.exitLossCoefficient),
                    }),
                    inletEdgeType: row.inletEdgeType,
                } : undefined;
                
                // Reconstruct HW outlet protection
                const hwOutletProtection = row.hwDesignDischarge ? {
                    type: culvertType,
                    designDischarge: Number(row.hwDesignDischarge),
                    ...(culvertType === 'box' ? {
                        tailwaterSurfaceElevation: Number(row.tailwaterSurfaceElevation),
                        maxAllowableChannelVelocity: Number(row.maxAllowableChannelVelocity),
                        barrelHeight: Number(row.barrelHeight),
                        barrelWidth: Number(row.barrelWidth),
                        numOfBarrels: Number(row.numOfBarrels),
                        inletElevationAtCulvertInlet: Number(row.inletElevationAtCulvertInlet),
                        isSlope: row.isSlope === 'true' || row.isSlope === true,
                        outletElevationOrSlope: Number(row.outletElevationOrSlope),
                        culvertLength: Number(row.culvertLength),
                        manningsRoughness: Number(row.manningsRoughness),
                        bendLossCoefficient: Number(row.bendLossCoefficient),
                        exitLossCoefficient: Number(row.exitLossCoefficient),
                        inletEdgeType: row.inletEdgeType,
                    } : {
                        barrelDiameter: Number(row.barrelDiameter),
                        inletEdgeType: row.inletEdgeType,
                    }),
                } : undefined;
                
                // Reconstruct profile
                const profile = row.profileBarrelDiameterOrHeight ? {
                    barrelDiameterOrHeight: Number(row.profileBarrelDiameterOrHeight),
                    barrelLength: Number(row.profileBarrelLength),
                    barrelInvertSlope: Number(row.profileBarrelInvertSlope),
                    downstreamInvertElevation: Number(row.downstreamInvertElevation),
                    downstreamTopEmbankmentElevation: Number(row.downstreamTopEmbankmentElevation),
                    upstreamTopEmbankmentElevation: Number(row.upstreamTopEmbankmentElevation),
                    designHeadwaterDepth: Number(row.designHeadwaterDepth),
                    tailwaterDepth: Number(row.tailwaterDepth),
                } : undefined;
                
                return {
                    ...baseCulvert,
                    ...(conduitFlow && { conduitFlow }),
                    ...(culvertRating && { culvertRating }),
                    ...(hwOutletProtection && { hwOutletProtection }),
                    ...(profile && { profile }),
                } as Culvert;
            });
            
            const designInfo: DesignInfo = {
                projectName,
                projectId,
                culverts,
            };

            // Validate the parsed data
            designInfoSchema.parse(designInfo);
            
            return designInfo;
        } catch (error) {
            console.error('Error converting CSV to design info:', error);
            throw error;
        }
    }
}