import React from 'react';
import { County } from './types/County';

interface CountyRowProps {
  county: County;
  isSelected: boolean;
  onClickHandler: () => void;
}

const CountyRow: React.FC<CountyRowProps> = ({
  county,
  isSelected,
  onClickHandler,
}) => {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div
      onClick={onClickHandler}
      style={{
        padding: '10px',
        margin: '5px',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#d0e6f5' : '#fff',
        border: isSelected ? '1px solid #007bff' : '1px solid #ddd',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <img
          src={`/images/${county.name.replace(' ', '_')}.png`}
          alt={county.name}
          style={{
            width: '50px',
            height: 'auto',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '4px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                padding: '3px',
                borderRadius: '6px',
                backgroundColor: '#666',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9em',
              }}
            >
              {county.prefix}
            </div>
            <div
              style={{
                fontWeight: 800,
              }}
            >{`- ${county.name} County, Idaho`}</div>
          </div>
          <div
            style={{
              fontWeight: 200,
              fontSize: '0.6em',
              maxLines: 1,
            }}
          >
            {`est. ${county.founding.dateString
              .split(' ')
              .pop()} | County Seat: ${
              county.countySeat.name
            } | Pop.: ${formatNumber(county.population)}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountyRow;
