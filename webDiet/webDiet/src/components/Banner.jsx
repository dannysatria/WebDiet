import imgBanner from "../assets/banner1.webp";

const Banner = () => {
  return (
    <>
      <div className="rounded-xl d-block relative overflow-hidden max-h-80">
        <div className="absolute pt-[150px] ps-10">
          <h1 className="text-start text-3xl text-black md:pb-10">
            <b>Start your diet, with </b>
            <b className="text-3xl md:pb-10" style={{ color: '#ABA944' }}>Dietry</b>
          </h1>
        </div>
        <img src={imgBanner} alt="banner" type="image/webp" />
      </div>
    </>
  );
};

export default Banner;
