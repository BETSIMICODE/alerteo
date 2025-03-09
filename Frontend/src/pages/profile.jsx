
import { Footer} from "@/widgets/layout";
import Navbar from "@/components/NavBar";
import DangerMap from "./itineraire";
import ButtonRetour from "@/components/ButtonRetour";

export function Profile() {
  return (
    <>
    <div>
    <Navbar/>
    
    </div>
   
    <DangerMap/>
    <ButtonRetour/>
      <div className="bg-white">
        <Footer />
      </div>

    </>
  );
}

export default Profile;
