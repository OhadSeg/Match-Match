import React, { useState, useMemo, useRef, useEffect, useContext } from 'react'
import SwipeButtons from '../SwipeButtons/SwipeButtons';
import TinderCard from 'react-tinder-card'
import styles from './TinderCards.module.css'
import instance from "../../rest-utils"
import { UsersContext } from "../../store/usersContext";

import buttonsStyles from "../SwipeButtons/SwipeButtons.module.css";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import StarRateIcon from "@mui/icons-material/StarRate";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import IconButton from "@mui/material/IconButton";

const db = [
  {
    email: '',
    name: 'Richard Hendricks',
    myPic: './img/richard.jpg'
  },
  {
    name: 'Erlich Bachman',
    myPic: './img/erlich.jpg'
  },  
  {
    name: 'Monica Hall',
    myPic: './img/monica.jpg'
  },
  {
    name: 'Jared Dunn',
    myPic: './img/jared.jpg'
  },
  {
    name: 'Dinesh Chugtai',
    myPic: './img/dinesh.jpg'
  },
  {
    name: 'Ohad Segal',
    myPic:'./img/ohad.jpg'
  },
  {
    name: 'Eran Yosefia',
    myPic:'./img/idan.jpg'
  },
  {
    name: 'Idan Cohen',
    myPic:'./img/eran.jpg'
  }

]

const TinderCards = () => {
  const [db, setDb] = useState([])
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const [user, setUser] = useState({});
  const currentIndexRef = useRef(currentIndex)
  const { token, setToken } = useContext(UsersContext)


  useEffect(() => {
    const token2 = token || window.localStorage.getItem('token')
    setToken(token2)
    instance.get('/users/getUsers',{
      headers:
          {"Authorization" : `Bearer ${token2}` }
  }).then((resp) => {
      setDb(resp.data);
      // db.push(...resp.data)
      setCurrentIndex(db.length - 1)
  })
},[])

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }
  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, name, email, index) => {
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    if(direction === 'right'){
      const token2 = token || window.localStorage.getItem('token')
      instance.post('/users/like', {email}, {
        headers:
            {"Authorization" : `Bearer ${token2}` }
    }).then((resp) => {
        if(resp.data === 'true')
        {
          console.log("There is match!!")
          //pop windows with fireworks!! something beautifull and in this window will be a rout to there chat!
        }
    })
    }
  }

  const outOfFrame = (name, idx) => {
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div className={styles['main-div']}>
      <link
        href='https://fonts.googleapis.com/css?family=Damion&display=swap'
        rel='stylesheet'
      />
      <link
        href='https://fonts.googleapis.com/css?family=Alatsi&display=swap'
        rel='stylesheet'
      />
      <div className={styles.cardContainer}>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className={styles.swipe}
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, character.email, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.myPic + ')' }}
              className={styles.card}
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className={styles.buttons}>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('left')}>Swipe left!</button>
        <button style={{ backgroundColor: !canGoBack && '#c3c4d3' }} onClick={() => goBack()}>Undo swipe!</button>
        <button style={{ backgroundColor: !canSwipe && '#c3c4d3' }} onClick={() => swipe('right')}>Swipe right!</button>
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className={styles.infoText}>
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className={styles.infoText}>
          Swipe a card or press a button to get Restore Card button visible!
        </h2>
      )}
      <div className={buttonsStyles.swipeButtons}>
      <IconButton className={buttonsStyles.swipeButtons__repeat}>
        <ReplayIcon fontSize="large" />
      </IconButton>
      <IconButton className={buttonsStyles.swipeButtons__left}>
        <CloseIcon fontSize="large" />
      </IconButton>
      <IconButton className={buttonsStyles.swipeButtons__star}>
        <StarRateIcon fontSize="large" />
      </IconButton>
      <IconButton className={buttonsStyles.swipeButtons__right} onClick={() => { console.log('onClick'); }}>
        <FavoriteIcon fontSize="large" />
      </IconButton>
      <IconButton className={buttonsStyles.swipeButtons__lightning}>
        <FlashOnIcon fontSize="large" />
      </IconButton>
    </div>
    </div>
  )
}

export default TinderCards;