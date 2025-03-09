import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";


function App() {
  const { pathname } = useLocation(); // Pour récupérer la route actuelle et masquer la navbar sur certaines pages

  return (
    <>
      {/* Affichage de la navbar sauf sur la page de login et d'inscription */}
      {!(pathname === '/sign-in' || pathname === '/sign-up') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4 font-poppins">
          <Navbar routes={routes} />
        </div>
      )}

      {/* Les routes principales */}
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} /> {/* Redirection vers la page d'accueil en cas de route inconnue */}
      </Routes>
    </>
  );
}

export default App;
