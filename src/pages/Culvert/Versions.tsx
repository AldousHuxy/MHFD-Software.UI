const Versions = () => {
  const versions = [
    {
      title: 'Culvert Design - MHFD-Culvert v4.01',
      url: 'https://www.mhfd.org/files/a17493b0f/MHFD-Culvert_v4.01.xlsm'
    }
  ];

  return (
    <div>
        <h1 className="text-center text-2xl font-bold mb-4 pt-4">Previous Versions</h1>
        <p className="text-center mb-6 px-4">
          Below are links to previous versions of the Culvert Design software. Click on the links to download the respective version.
        </p>
        <div className="max-w-3xl mx-auto p-4 bg-slate-100 rounded-lg shadow-md">
          <ul className="list-disc list-inside">
            {versions.map((version, index) => (
              <li key={index} className="mb-2">
                <a href={version.url} target="_blank" rel="noopener noreferrer" className="text-mhfd-dark-blue hover:underline">
                  {version.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
    </div>
  )
}

export default Versions;