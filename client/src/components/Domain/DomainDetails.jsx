import { useEffect, useState } from 'react';

const DomainDetails = () => {
  const [domainDetails, setDomainDetails] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('domainDetails');
    if (data) {
      setDomainDetails(data);
    }
  }, []);

  return (
    <div>
      <h2>Domain Details</h2>
      {domainDetails ? <pre>{domainDetails}</pre> : <p>No Domain details available.</p>}
    </div>
  );
};

export default DomainDetails;
