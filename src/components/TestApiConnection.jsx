import { useState } from 'react';
import { contentAPI, authAPI } from '../services/api';
import toast from 'react-hot-toast';

/**
 * Test component to verify API connections
 * Use this component to quickly test if your backend is properly connected
 * 
 * Usage: Import and add <TestApiConnection /> to any page during development
 */
const TestApiConnection = () => {
  const [testResults, setTestResults] = useState({
    backend: null,
    content: null,
    auth: null,
  });
  const [testing, setTesting] = useState(false);

  const testBackendConnection = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/auth/test');
      const data = await response.json();
      return data.success ? 'Connected ✅' : 'Failed ❌';
    } catch (error) {
      return `Error: ${error.message} ❌`;
    }
  };

  const testContentAPI = async () => {
    try {
      const response = await contentAPI.getAllContent({ limit: 1 });
      return response.data ? 'Working ✅' : 'No data ⚠️';
    } catch (error) {
      return `Error: ${error.message} ❌`;
    }
  };

  const testAuthEndpoint = async () => {
    try {
      // Test endpoint exists (will fail auth but that's ok)
      const response = await fetch('http://localhost:3000/api/v1/user', {
        credentials: 'include'
      });
      return response.status === 401 ? 'Endpoint exists ✅' : 'Connected ✅';
    } catch (error) {
      return `Error: ${error.message} ❌`;
    }
  };

  const runTests = async () => {
    setTesting(true);
    toast.loading('Testing API connections...');

    const results = {
      backend: await testBackendConnection(),
      content: await testContentAPI(),
      auth: await testAuthEndpoint(),
    };

    setTestResults(results);
    setTesting(false);
    toast.dismiss();
    
    const allPassed = Object.values(results).every(r => r.includes('✅'));
    if (allPassed) {
      toast.success('All tests passed!');
    } else {
      toast.error('Some tests failed. Check console for details.');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-sm z-50">
      <h3 className="text-lg font-bold mb-3">API Connection Test</h3>
      
      <button
        onClick={runTests}
        disabled={testing}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mb-3 disabled:opacity-50"
      >
        {testing ? 'Testing...' : 'Run Tests'}
      </button>

      {Object.keys(testResults).length > 0 && testResults.backend && (
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>Backend:</span>
            <span className="font-mono">{testResults.backend}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Content API:</span>
            <span className="font-mono">{testResults.content}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Auth API:</span>
            <span className="font-mono">{testResults.auth}</span>
          </div>
        </div>
      )}

      <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
        <p>Backend: http://localhost:3000</p>
        <p className="mt-1">Remove this component in production</p>
      </div>
    </div>
  );
};

export default TestApiConnection;
