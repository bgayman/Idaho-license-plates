import React from 'react';
import { County } from './types/County';
import Divider from './Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLandmark,
  faExpand,
  faPlus,
  faWater,
  faLeaf,
  faPeopleGroup,
} from '@fortawesome/free-solid-svg-icons';
import ScatterPlot from './ScatterPlot';

interface CountyDetailsProps {
  county: County;
}

const CountyDetails: React.FC<CountyDetailsProps> = ({ county }) => {
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
  };
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US').format(date);
  };
  return (
    <div>
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
      <Divider />
      <p style={{ color: '#444', fontSize: '0.75em' }}>
        {county.shortDescription}
      </p>
      <p style={{ textAlign: 'end', fontSize: '0.75em' }}>
        <a
          style={{ textDecoration: 'none', color: '#007bff' }}
          href={`https://en.wikipedia.org/wiki/${county.name}_County,_Idaho`}
        >
          More
        </a>
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '8px',
          height: '110px',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(250, 250, 250, 0.4)',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)', // The blur effect
            WebkitBackdropFilter: 'blur(10px)',
            color: '#444',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontSize: '0.75em',
            justifyContent: 'start',
            padding: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: '4px',
              fontWeight: 800,
              fontSize: '1.5em',
            }}
          >
            <FontAwesomeIcon icon={faLandmark} size="sm" />
            <div>Founding</div>
          </div>
          <div>{county.founding.dateString}</div>
          <div>Named for {county.founding.namedFor}</div>
        </div>
        <div
          style={{
            backgroundColor: 'rgba(250, 250, 250, 0.4)',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)', // The blur effect
            WebkitBackdropFilter: 'blur(10px)',
            color: '#444',
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontSize: '0.75em',
            justifyContent: 'start',
            padding: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: '4px',
              fontWeight: 800,
              fontSize: '1.5em',
            }}
          >
            <FontAwesomeIcon icon={faExpand} size="sm" />
            <div>Area</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: '4px',
            }}
          >
            <FontAwesomeIcon icon={faPlus} size="sm" />
            <div>
              {formatNumber(county.area.total.value)}{' '}
              {county.area.total.unit.symbol}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: '4px',
            }}
          >
            <FontAwesomeIcon icon={faLeaf} size="sm" />
            <div>
              {formatNumber(county.area.land.value)}{' '}
              {county.area.land.unit.symbol}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: '4px',
            }}
          >
            <FontAwesomeIcon icon={faWater} size="sm" />
            <div>
              {formatNumber(county.area.water.value)}{' '}
              {county.area.water.unit.symbol}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: '8px',
          height: '110px',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(250, 250, 250, 0.4)',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)', // The blur effect
            WebkitBackdropFilter: 'blur(10px)',
            color: '#444',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontSize: '0.75em',
            justifyContent: 'start',
            padding: '10px',
            marginTop: '10px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'baseline',
              gap: '4px',
              fontWeight: 800,
              fontSize: '1.5em',
            }}
          >
            <FontAwesomeIcon icon={faPeopleGroup} size="sm" />
            <div>Population</div>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '4px',
          }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: '50%',
            }}>
              <div>{formatNumber(county.population)} people</div>
              <div>
                {formatNumber(county.population / county.area.total.value)}{' '}
                people / {county.area.total.unit.symbol}
              </div>
            </div>
            <ScatterPlot numDots={county.population / county.area.total.value} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountyDetails;
