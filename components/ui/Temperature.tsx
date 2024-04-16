import type { SectionProps } from "deco/types.ts";
import weather, {
  Props as TemperatureLoaderProps,
} from "apps/weather/loaders/temperature.ts";

interface TemperatureSectionProps {
  /** @title Locality registration */
  /** @description Enter your latitude and longitude below */
  latLong: TemperatureLoaderProps;
}

export const loader = async (props: TemperatureSectionProps, req: Request) => {
  const { latLong } = props;
  const temperature = await weather(latLong, req);

  return {
    ...props,
    temperature,
  };
};

const Temperature = ({ temperature }: SectionProps<typeof loader>) => {
  return (
    <button className="fixed bottom-4 right-4 bg-primary hover:bg-green-600 text-white rounded-full p-2">
      {temperature?.celsius}º
    </button>
  );
};

export default Temperature;
