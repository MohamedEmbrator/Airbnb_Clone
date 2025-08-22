import { LiveData } from "../types/app";
import { getLiveData } from "../utils/api";
import LiveCard from "./LiveCard";


const Live = async () => {
  const liveData: LiveData = await getLiveData();
  return (
    <section className="pt-6 mt-10">
      <div className="container flex space-x-3 overflow-scroll p-3 no-scrollbar">
        {liveData.map((item, index) => {
          return (
            <LiveCard key={index} img={item.img} title={item.title} />
          )
        })}
      </div>
    </section>
  );
}

export default Live;
