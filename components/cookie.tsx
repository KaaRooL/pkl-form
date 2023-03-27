import Link from "next/link";
import styles from "./cookie.module.css"
import React, { useState } from 'react';

function cookie(){

  const [className, setClassName] = useState(`${styles.popup}`);

  const handleClick = () => {
    setClassName(className === `${styles.popup}` ? `${styles["popup-closed"]}` : `${styles.popup}`);
  };
  
  return(
<div className={className}>
  <div className={styles["popup-content"]}>
    <span onClick={() => handleClick()} className={styles["close-button"]}>&times;</span>
    <p>Szanowni Państwo! Nasza witryna wykorzystuje pliki cookie, aby dostarczyć nam danych statystycznych oraz aby zapewnić jak najlepsze wrażenia podczas odwiedzin naszej strony internetowej. Korzystanie z witryny bez zmiany ustawień przeglądarki dotyczących cookie oznacza, że będą one zamieszczane w Państwa urządzeniu końcowym. Nie korzystamy z plików cookie, aby śledzić poszczególnych użytkowników lub ich identyfikować, ale aby zdobyć przydatną wiedzę o tym, jak jest używana nasza witryna, abyśmy mogli ją ulepszać dla naszych użytkowników. Mogą Państwo dokonać, w każdym czasie, zmiany ustawień dotyczących cookie. Wszystkie najnowsze wersje popularnych przeglądarek zapewniają użytkownikom kontrolę nad plikami cookie. Użytkownicy mogą ustawić swoją przeglądarkę tak, aby zaakceptowała lub odrzuciła wszystkie lub niektóre pliki cookie. Kontynuując korzystanie z naszej witryny bez zmiany ustawień przeglądarki wyrażają Państwo zgodę na wykorzystanie plików cookie. Więcej o plikach cookie w
    <Link href="https://www.pkl.pl/polityka-prywatnosci-pkl-n.html"> Polityce prywatności</Link>
    .</p>
  </div>
</div>)
}



export default cookie;