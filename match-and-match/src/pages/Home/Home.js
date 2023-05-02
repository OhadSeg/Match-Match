import { Link } from 'react-router-dom';
import SwipeButtons from '../../components/SwipeButtons/SwipeButtons';
import TinderCards from '../../components/TinderCards/TinderCards';
import "./Home.css"

function HomePage() {
  return (
    <>
    <TinderCards/>
    <SwipeButtons/>
    </>
    
  );
}

export default HomePage;