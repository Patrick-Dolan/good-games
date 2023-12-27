import { useLayoutEffect, useState } from "react";
import { formatDate } from "../../../utility-functions";
import DOMPurify from "dompurify";
import Tag from "./Tag";
import { useFirebaseAuth } from "../../context/AuthContext";
import ImageSlider from "../image-manipulation/ImageSlider";

function GameDetails({ game, openModal }) {
  const { user } = useFirebaseAuth();
  const [showMore, setShowMore] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleDescriptionToggle = () => {
    setShowMore(!showMore);
  }

  const handleAddToShelfClick = () => {
    openModal();
  }

  let descriptionSection = <p>No description available.</p>;
  if (showMore) {
    descriptionSection = 
      <>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(game.description) }}></div>
        <button className="game__details--show-more-button" onClick={handleDescriptionToggle}>Show Less...</button>
      </>;
  } else {
    descriptionSection = 
      <>
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(game.description.substr(0, 200).trim() + "...")}}></div>
        <button className="game__details--show-more-button" onClick={handleDescriptionToggle}>Show More...</button>
      </>;
  }

  // TODO add indicators of if game is on user's shelf and which shelf(s) it is on

  return (
    <div>
      <ImageSlider images={game.screenshots} />
      <h2 className="mt-1">{game.name}</h2>
      <hr className="mb-1" />
      {user && (
        <div>
          <div className="row mb-1">
            <button className="margin-center" onClick={handleAddToShelfClick}>Add to shelf</button>
          </div>
          <hr />
        </div>
      )}
      <h5>Description</h5>
      {descriptionSection}
      {/* TODO Add MetaCritic icon */}
      <h5>MetaCritic rating</h5>
      {game?.metacriticScore 
        ? <p>{game.metacriticScore}</p>
        : <p>No MetaCritic rating available.</p> 
      }
      {/* TODO Add appropriate ESRB icon */}
      <h5>ESRB</h5>
      {game?.esrbRating 
        ? <p>{game.esrbRating}</p>
        : <p>No ESRB rating available.</p> 
      }
      <h5>Release Date</h5>
      {game?.releaseDate 
        ? <p>{formatDate(game.releaseDate)}</p>
        : <p>No release date available.</p>
      }
      <h5>Website</h5>
      {game?.website
        ? <p><a href={game.website} target="_blank" rel="noreferrer">Game Website</a></p>
        : <p>No website available.</p>
      }
      {/* TODO replace with Icons */}
      <h5>Platforms</h5>
      {game?.platforms 
        ? <p>{game.platforms.join(", ")}</p>
        : <p>No platforms available.</p>
      }
      {/* TODO make tags clickable to cause some sort of search? */}
      <h5 className="mb-1r">Tags</h5>
      {game?.tags
        ? (
          <div className="tag-container">
            {game.tags.map((tag, index) => (
              <Tag key={index} tagName={tag} />
            ))}
          </div>
        ) : ( 
          <p>No tags available.</p> 
        )
      }
    </div>
  )
}

export default GameDetails;