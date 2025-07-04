import landingImage from "../assets/landing.png";
import appDownload from "../assets/appDownload.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <div className="bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-green-600">
          Make your diet healthier today
        </h1>
        <span className="text-xl">Food is just a click away!</span>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="landing-image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order food even faster!
          </span>
          <span>Download the Clucky App for a better user experience</span>
          <img src={appDownload} alt="app-download" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
