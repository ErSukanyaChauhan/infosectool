import { useEffect, useState } from 'react';

const IpDetails = () => {
  const [ipDetails, setIpDetails] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('ipDetails');
    if (data) {
      setIpDetails(data);
    }
  }, []);

  return (
    <div>
      <h2>IP Details</h2>
      {ipDetails ? <pre>{ipDetails}</pre> : <p>No IP details available.</p>}
    </div>
  );
};

export default IpDetails;
