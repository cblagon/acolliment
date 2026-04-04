import { Composition } from "remotion";
import { RoleplayVideo } from "./RoleplayVideo";
import { roleplays } from "./data";

const TITLE_DURATION = 90;
const LINE_DURATION = 100;
const END_DURATION = 60;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {roleplays.map((rp) => (
        <Composition
          key={rp.id}
          id={rp.id}
          component={RoleplayVideo}
          durationInFrames={
            TITLE_DURATION + rp.lines.length * LINE_DURATION + END_DURATION
          }
          fps={30}
          width={1920}
          height={1080}
          defaultProps={{ data: rp }}
        />
      ))}
    </>
  );
};
