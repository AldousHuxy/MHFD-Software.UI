export const Pipe = () => {
    const label: string = '#123456';

    return (
        <div style={{ padding: '20px' }}>
            <svg width="400" height="100" viewBox="0 0 400 100">
                {/* Cylinder back ellipse */}
                <ellipse 
                    cx="50" 
                    cy="50" 
                    rx="20" 
                    ry="30" 
                    fill="#ffffff" 
                    stroke="#000000" 
                    strokeWidth="2"
                />
                
                {/* Cylinder body top/bottom lines */}
                <line x1="50" y1="20" x2="350" y2="20" stroke="#000000" strokeWidth="2" />
                <line x1="50" y1="80" x2="350" y2="80" stroke="#000000" strokeWidth="2" />
                
                {/* Cylinder body fill */}
                <rect 
                    x="50" 
                    y="20" 
                    width="300" 
                    height="60" 
                    fill="#ffffff" 
                    stroke="none"
                />
                
                {/* Cylinder body left edge */}
                <line x1="50" y1="20" x2="50" y2="80" stroke="#000000" strokeWidth="2" />
                
                {/* Cylinder front ellipse */}
                <ellipse 
                    cx="350" 
                    cy="50" 
                    rx="20" 
                    ry="30" 
                    fill="#ffffff" 
                    stroke="#000000" 
                    strokeWidth="2"
                />
                
                {/* Label text */}
                <text 
                    x="200" 
                    y="55" 
                    textAnchor="middle" 
                    fontSize="20" 
                    fontWeight="bold" 
                    fill="#000000"
                >
                    {label}
                </text>
            </svg>
        </div>
    );
}