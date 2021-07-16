import React, { useEffect, useState } from 'react';
import List from './sale.list';
import Program from './sale.program';

const data = [
  {
    id: "1",
    name: "Deal Registration",
    description: null,
    programtype: "DR"
  },
  {
    id: "2",
    name: "Special Pricing",
    description: null,
    programtype: "SPA"
  }
]

const Sale: React.FC<{ name: string }> = (props): JSX.Element => {

  const [programs, setPrograms] = useState(null);

  useEffect(() => {
    setPrograms(data);
  }, []);

  return programs === null ? <div>loading...</div> : (
    <div>
      {
        props.name === 'sales' && <List {...props} programs={programs} />
      }
      {
        props.name === 'program' && <Program {...props} programs={programs} />
      }
    </div>
  );
};

export default Sale;
