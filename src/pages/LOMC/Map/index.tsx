import { useEffect, useRef, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import esriConfig from '@arcgis/core/config';
import { generateToken } from '@/utils/token';

const ArcGISMap = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    generateToken('AGOL')
      .then(token => {
        setToken(token);
        esriConfig.apiKey = token;
      })
      .catch(error => {
        console.error('Failed to generate token:', error);
      });
  }, []);

  useEffect(() => {
    if (!mapDiv.current || !token) return;

    const floodplainsNonFEMALayer = new FeatureLayer({
      url: 'https://gis.mhfd.org/server/rest/services/Hydraulics/FloodplainsNonFEMA/FeatureServer/0',
      outFields: [
        'submittal_fema',
        'floodplain_type',
        'study_name',
        'board_acceptance_date',
        'state_designation_date',
        'board_adoption_date',
        'pon_date',
        'draft_release_date',
        'preliminary_release_date',
        'lfd_date',
        'effective_date',
        'county',
        'service_area',
        'notes'
      ],
      popupTemplate: {
        title: '{study_name}',
        content: `
            <ul>
                <li><strong>Submittal FEMA:</strong> {submittal_fema}</li>
                <li><strong>Floodplain Type:</strong> {floodplain_type}</li>
                <li><strong>Board Acceptance Date:</strong> {board_acceptance_date}</li>
                <li><strong>State Designation Date:</strong> {state_designation_date}</li>
                <li><strong>Board Adoption Date:</strong> {board_adoption_date}</li>
                <li><strong>PON Date:</strong> {pon_date}</li>
                <li><strong>Draft Release Date:</strong> {draft_release_date}</li>
                <li><strong>Preliminary Release Date:</strong> {preliminary_release_date}</li>
                <li><strong>LFD Date:</strong> {lfd_date}</li>
                <li><strong>Effective Date:</strong> {effective_date}</li>
                <li><strong>County:</strong> {county}</li>
                <li><strong>Service Area:</strong> {service_area}</li>
                <li><strong>Notes:</strong> {notes}</li>
            </ul>
          `
      }
    });

    const map = new Map({
      basemap: 'topo-vector',
      layers: [floodplainsNonFEMALayer]
    });

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-104.9903, 39.7392],
      zoom: 10
    });

    view.ui.remove('attribution');

    return () => {
      view?.destroy();
    };
  }, [token]);

  return (
    <div className="w-full h-full">
      <div ref={mapDiv} className="w-full h-full" />
    </div>
  );
}

export default ArcGISMap;