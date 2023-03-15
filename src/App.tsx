import preview from '@/assets/preview/carbon.svg';
import { Button } from 'antd';
import { AircraftCard } from './components/AircraftCard/AircraftCard';
import { Aircraft } from './models/aircraft';
import themeConfig from './utils/utils';

function App() {
  return (
    <div className="flex justify-center items-center flex-col h-screen space-y-5 bg-dark-purple">
      <h1 className="text-4xl font-bold text-linen text-center ">
        Hello World
      </h1>
      <AircraftCard aircraft={new Aircraft('KEL321', 'A380', 100, 'CPV')} />
      <Button
        type="primary"
        className=" bg-teal-600 border-teal-600 text-white font-bold rounded-none "
      >
        Ant btn with a tailwind css styles
      </Button>
      <Button type="primary">Ant btn</Button>
      <Button
        type="primary"
        style={{
          background: themeConfig.theme.colors['slate-blue'],
          borderColor: themeConfig.theme.colors['slate-blue'],
        }}
      >
        Ant btn with a javascript variable colors
      </Button>
    </div>
  );
}

export default App;
