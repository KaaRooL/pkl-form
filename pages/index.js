import Head from 'next/head';
import Layout from '../components/layout';
import Form from '../components/form'
import Banner from '../components/banner'
import styles from '../styles/styles.module.css';
import Cookie from '../components/cookie';
import dynamic from "next/dynamic";

export default function Home() {    
  const BannerDynamic = dynamic(() => import('../components/banner'), { ssr: false });
  return (
    <Layout>
      <Head>
        <title>PKL Solina Formularz</title>
      </Head>
      <Cookie></Cookie>
      <BannerDynamic></BannerDynamic>
      <div className={styles.container}>
        <div className={styles.intro}>
         

          <p align="justify">Szukasz <strong>najlepszej wycieczki szkolnej</strong> w regionie? Interesuje Cię <strong>kompleksowa obsługa</strong> i atrakcje dla każdej grupy wiekowej? Zostaw sw&oacute;j kontakt, a my <strong>przygotujemy wszystko za Ciebie!</strong></p>

          <br></br>

          <p align="justify">W programie między innymi:</p>

          <br></br>

          <ul>

            <li> <span>&#x2713;</span> edukacyjna wystawa multimedialna w dolnej stacji kolei</li>

            <li> <span>&#x2713;</span> przejazd najnowocześniejszą w Polsce koleją linową ze spektakularnymi widokami na zaporę i Jezioro Solińskie</li>

            <li> <span>&#x2713;</span> otwarty taras na wieży widokowej z panoramą Bieszczad</li>

            <li> <span>&#x2713;</span> park rozrywki Tajemnicza Solina, czyli baśniowa kraina Bies&oacute;w i Czad&oacute;w</li>

          </ul>

          <br></br>

          <p align="justify">Potrzebujesz transportu, noclegu lub dodatkowych atrakcji? A może chcesz skorzystać z dofinansowania wycieczki z programu Poznaj Polskę? Tu także możesz liczyć na nasze wsparcie. Odkryj Solinę i Bieszczady na nowo.&nbsp;<strong>Nauka, przyroda, przygoda!&nbsp;</strong></p>

          <br></br>

          <p align="justify">Przygotujemy ofertę skrojoną idealnie do Twoich potrzeb. Wypełnij formularz i czekaj na kontakt naszego doradcy.</p>

        </div>
        <Form></Form>
      </div>
    </Layout>
  )
}
