import { useState } from 'react';
import './App.css';
import { Button } from './Components/Button';
import prank from './Assets/Prank.mp3';

function App() {
  const [strToDisplay, setStrToDisplay] = useState('');
  const [lastOperator, setLastOperator] = useState('');
  const operators = ['+', '-', '*', '/', '%'];
  const [isPrank, setIsPrank] = useState(false);

  const handleOnChange = (val) => {
    setIsPrank(false);
    if (val === 'AC') {
      return setStrToDisplay('');
    }

    if (val === 'C') {
      return setStrToDisplay(strToDisplay.slice(0, -1));
    }

    if (val === '=') {
      const lastChar = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lastChar)) {
        //remove the last char from the strToDisplay

        setStrToDisplay(strToDisplay.slice(0, -1));
      }
      return total();
    }

    if (operators.includes(val)) {
      setLastOperator(val);
      const lastChar = strToDisplay[strToDisplay.length - 1];

      if (operators.includes(lastChar)) {
        //remove the last char from the strToDisplay
        return setStrToDisplay(strToDisplay.slice(0, -1));
      }
    }

    if (val === '.') {
      const indexOfLastOperator = strToDisplay.lastIndexOf(lastOperator);

      const lastNumberSet = strToDisplay.slice(indexOfLastOperator);

      if (lastNumberSet.includes('.')) {
        return;
      }

      if (!lastOperator && strToDisplay.includes('.')) {
        return;
      }
    }

    setStrToDisplay(strToDisplay + val);
  };

  const total = () => {
    const extraVal = randomNumber();
    if (extraVal) {
      audioPlay();
      setIsPrank(true);
    }

    const ttl = eval(strToDisplay) + extraVal;
    setStrToDisplay(ttl.toString());
  };

  const randomNumber = () => {
    const num = Math.round(Math.random() * 10);

    return num < 9 ? num : 0;
  };

  const audioPlay = () => {
    const audio = new Audio(prank);
    audio.play();
  };

  const btns = [
    {
      cls: 'btn btn-ac',
      label: 'AC',
    },
    {
      cls: 'btn btn-c',
      label: 'C',
    },
    {
      cls: 'btn btn-per',
      label: '%',
    },
    {
      cls: 'btn btn-divide',
      label: '/',
    },
    {
      cls: 'btn btn-7',
      label: '7',
    },
    {
      cls: 'btn btn-8',
      label: '8',
    },
    {
      cls: 'btn btn-9',
      label: '9',
    },
    {
      cls: 'btn btn-X',
      label: '*',
    },
    {
      cls: 'btn btn-5',
      label: '5',
    },
    {
      cls: 'btn btn-4',
      label: '4',
    },
    {
      cls: 'btn btn-6',
      label: '6',
    },
    {
      cls: 'btn btn-minus',
      label: '-',
    },
    {
      cls: 'btn btn-1',
      label: '1',
    },
    {
      cls: 'btn btn-2',
      label: '2',
    },
    {
      cls: 'btn btn-3',
      label: '3',
    },
    {
      cls: 'btn btn-plus',
      label: '+',
    },
    {
      cls: 'btn btn-0',
      label: '0',
    },
    {
      cls: 'btn btn-dot',
      label: '.',
    },
    {
      cls: 'btn btn-ans',
      label: '=',
    },
  ];
  return (
    <div className='wrapper'>
      <div className='calculator'>
        <div className={isPrank ? 'display prank' : 'display'}>
          {strToDisplay || '0.00'}
        </div>
        {btns.map((item, i) => (
          <Button
            key={i}
            cls={item.cls}
            label={item.label}
            handleOnChange={handleOnChange}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
