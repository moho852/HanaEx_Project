import React, { useState } from 'react';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud';
import { Text } from '@visx/text';

const words = [
  { text: 'hello', value: 50 },
  { text: 'world', value: 30 },
  { text: 'visx', value: 20 },
  { text: 'wordcloud', value: 40 },
  { text: 'react', value: 25 },
  { text: 'd3', value: 35 },
  { text: 'javascript', value: 45 },
  { text: 'typescript', value: 15 },
  { text: 'data', value: 10 },
  { text: 'visualization', value: 5 }
];

const colors = ['#143059', '#2F6B9A', '#82a6c2'];

const fontScale = scaleLog({
  domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
  range: [10, 100],
});
const fontSizeSetter = (datum) => fontScale(datum.value);

const fixedValueGenerator = () => 0.5;

const WordcloudComponent = ({ width, height, showControls = true }) => {
  const [spiralType, setSpiralType] = useState('archimedean');
  const [withRotation, setWithRotation] = useState(false);

  const getRotationDegree = () => {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
  };

  return (
    <div className="wordcloud">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={2}
        spiral={spiralType}
        rotate={withRotation ? getRotationDegree : 0}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
      {showControls && (
        <div>
          <label>
            Spiral type &nbsp;
            <select
              onChange={(e) => setSpiralType(e.target.value)}
              value={spiralType}
            >
              <option key={'archimedean'} value={'archimedean'}>
                archimedean
              </option>
              <option key={'rectangular'} value={'rectangular'}>
                rectangular
              </option>
            </select>
          </label>
          <label>
            With rotation &nbsp;
            <input
              type="checkbox"
              checked={withRotation}
              onChange={() => setWithRotation(!withRotation)}
            />
          </label>
          <br />
        </div>
      )}
      <style jsx>{`
        .wordcloud {
          display: flex;
          flex-direction: column;
          user-select: none;
        }
        .wordcloud svg {
          margin: 1rem 0;
          cursor: pointer;
        }

        .wordcloud label {
          display: inline-flex;
          align-items: center;
          font-size: 14px;
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
};

export default WordcloudComponent;
