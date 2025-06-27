
import { useState } from 'react';

export default function EligibilityTool() {
  const [formData, setFormData] = useState({
    siteAddress: '',
    utilityProvider: '',
    disadvantagedCommunity: '',
    numChargers: '',
    chargerType: '',
    chargerKW: '',
    numPorts: '',
    portKW: '',
    usageType: '',
    publicAccess: '',
    name: '',
    email: '',
    company: ''
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const estimateFunding = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://eligibility-ddxm.onrender.com/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
      });
      const data = await response.json();
      setResults(data.result);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">EV Charging Incentive Eligibility Tool</h2>

      {Object.entries({
        'Site Address': 'siteAddress',
        'Utility Provider': 'utilityProvider',
        'Number of Chargers': 'numChargers',
        'Charger Type': 'chargerType',
        'Charger kW Rating': 'chargerKW',
        'Number of Charging Ports': 'numPorts',
        'Port kW Output': 'portKW',
        'Name': 'name',
        'Company': 'company',
        'Email': 'email'
      }).map(([label, name]) => (
        <div key={name} className="mb-4">
          <label className="block font-medium mb-1">{label}</label>
          <input
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block font-medium mb-1">Disadvantaged Community?</label>
        <select
          name="disadvantagedCommunity"
          value={formData.disadvantagedCommunity}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Not sure">Not sure</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Who will use the chargers?</label>
        <div className="space-y-1">
          {['Commercial', 'Multi-Family', 'Workplace', 'Office', 'Fleet', 'Government/Municipal'].map(opt => (
            <label key={opt} className="flex items-center space-x-2">
              <input
                type="radio"
                name="usageType"
                value={opt}
                checked={formData.usageType === opt}
                onChange={handleChange}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block font-medium mb-1">Public Access?</label>
        <select
          name="publicAccess"
          value={formData.publicAccess}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value="">Select</option>
          <option value="Yes – 24/7 public">Yes – 24/7 public</option>
          <option value="Yes – Limited public access">Yes – Limited public access</option>
          <option value="No">No</option>
        </select>
      </div>

      <button
        onClick={estimateFunding}
        disabled={loading}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
      >
        {loading ? 'Estimating...' : 'Estimate Funding'}
      </button>

      {results && (
        <div className="mt-8 p-4 bg-gray-100 border rounded-md whitespace-pre-wrap text-sm font-mono">
          <h3 className="text-lg font-semibold mb-2">Estimated Funding Ranges:</h3>
          {results}
        </div>
      )}
    </div>
  );
}
