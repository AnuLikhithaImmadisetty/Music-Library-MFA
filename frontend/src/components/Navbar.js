import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MusicContext } from "../Context";
import { UserContext } from "../UserContext"; // Import UserContext

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  const musicContext = useContext(MusicContext);
  const { login, user, setLogin, setUser } = useContext(UserContext); // Use UserContext

  const [sign, setSign] = useState(false);
  const likedMusic = musicContext.likedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  const setResultOffset = musicContext.setResultOffset;

  const handleSign = () => {
    setLogin((prevLogin) => !prevLogin); // Toggle login state
    setSign((prevSign) => !prevSign); // Toggle sign state
  };

  const handleLogout = () => {
    setLogin(false); // Reset login state
    setSign(false); // Reset sign state
    setUser(null); // Reset user context
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-danger sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-music-note-list mx-3"></i> Anu-Music
          </Link>
          <div>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn btn-secondary btn-sm mx-1"
            >
              <i className="bi bi-pin-angle-fill"></i> {pinnedMusic.length}
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#likedMusicModal"
              className="btn btn-secondary btn-sm mx-1"
            >
              <i className="bi bi-heart-fill"></i> {likedMusic.length}
            </button>
          </div>

          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress}
              className="form-control me-2 w-75"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              onClick={() => {
                setResultOffset(0);
                fetchMusicData();
              }}
              className="btn btn-outline-dark"
            >
              Search
            </button>

            {/* Show 'Sign Up' button and 'Login' button when the user is not logged in */}
            {!login ? (
              <>
                <NavLink to="/signup">
                  <button key={24} type="button" className="btn btn-primary m-3">
                    SignUp
                  </button>
                </NavLink>
                <NavLink to="/login">
                  <button
                    key={22}
                    type="button"
                    onClick={handleSign}
                    className="btn btn-primary m-3"
                  >
                    Login
                  </button>
                </NavLink>
              </>
            ) : (
              // Show username and 'Logout' button when logged in
              <>
                <span className="navbar-text text-white m-3">
                  Welcome, {user ? user.username : "Guest"} {/* Fallback to "Guest" if user is undefined */}
                </span>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="btn btn-danger m-3"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modals for pinned and liked music */}
      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabIndex={1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Pinned Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* Render pinned music */}
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade modal-xl"
        id="likedMusicModal"
        tabIndex={1}
        aria-labelledby="likedMusicModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="likedMusicModalLabel">
                Liked Music
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* Render liked music */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
