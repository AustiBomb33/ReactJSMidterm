import Instructions from '../shared/Instructions';
import Header from '../shared/Header';


const home = () => {
  return (
    <>
      <div className="container-fluid">
        <Header title="Home Sweet Home" />
        <Instructions />
      </div>
    </>
  );
}

export default home;