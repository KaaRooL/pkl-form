
import Link from 'next/link';
import styles from './form.module.css';
import { useForm } from "react-hook-form";


export default function Form(){
  const onSubmit = async (input:any) => {
    if(input.firstName.length>0){
      console.log("spam bot!");
      return;
    }
    const data = {
      company: input.company,
      name: input.name,
      email: input.email,
      phone: input.phone
    }
    const JSONdata = JSON.stringify(data)

    const endpoint = '/api/form'

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const response = await fetch(endpoint, options)
    if(response.ok){
      alert(`Dziękujemy za uzupełnienie formularza.`)
    }
    else{
      alert(`Coś poszło nie tak, proszę odświeżyć stronę i spróbować ponownie.`)
    }
  }

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  return( 
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
  <div className={styles["form-group"]}>
  <label className={styles.label} htmlFor="company">Nazwa placówki</label>
    <input {...register("company", { required: true, maxLength: 100 })}  type="text" id="company" name="company" className={styles["form-control"]} 
    aria-invalid={errors.company ? "true" : "false"}/>
    {errors.company?.type == "required" && <span>Pole jest wymagane.</span>}
    {errors.company?.type == "maxLength" && <span>Nazwa nie może być dłuższa, niż 100 znaków.</span>}
  </div>
  <div className={styles["form-group"]}>
  <label className={styles.label} htmlFor="name">Imię i nazwisko</label>
    <input {...register("name", { required: true, maxLength: 50 })} type="text" id="name" name="name" className={styles["form-control"]} 
    aria-invalid={errors.name ? "true" : "false"}/>
    {errors.name?.type == "required" && <span>Pole jest wymagane.</span>}
    {errors.name?.type == "maxLength" && <span>Imię i nazwisko nie może być dłuższe, niż 50 znaków.</span>}
  </div>
  <div className={styles["form-group"]}>
    <label className={styles.label} htmlFor="email">Email</label>
    <input {...register("email", { required: true, maxLength: 100, pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} type="email" id="email" name="email" className={styles["form-control"]}
    aria-invalid={errors.email ? "true" : "false"}/>
    {errors.email?.type == "required" && <span>Pole jest wymagane.</span>}
    {errors.email?.type == "pattern" && <span>Adres email powinien być zapisany w odpowiednim formacie.</span>}
    {errors.email?.type == "maxLength" && <span>Adres email nie może być dłuższy, niż 100 znaków.</span>}
  </div>
  <div className={styles["form-group"]}>
  <label className={styles.label} htmlFor="phone">Telefon</label>
    <input {...register("phone", { required: true, maxLength: 15, pattern: /^\d+$/ })} type="tel" id="phone" name="phone" className={styles["form-control"]}
    aria-invalid={errors.phone ? "true" : "false"}/>
    {errors.phone?.type == "required" && <span>Pole jest wymagane.</span>}
    {errors.phone?.type == "pattern" && <span>Numer telefonu powinien składać się z samych cyfr.</span>}
    {errors.phone?.type == "maxLength" && <span>Numer telefonu nie może być dłuższy, niż 15 cyfr.</span>}
    
  </div>

  <button type="submit" className={styles.btn}>Wyślij</button>

  <div className={styles["form-group"] + ' permission'}>
  <label className={styles.permission} htmlFor="permission">   
    <input {...register("permission", { required: true, maxLength: 100 })} type="checkbox" id="permission" name="permission" className={styles["form-control"] + 'permission'}/>
     Oświadczam, iż zapoznałem się z treścią{" "}
      <Link href="https://www.pkl.pl/polityka-prywatnosci-pkl-n.html">Polityką Prywatności</Link> 
      {" "}oraz{" "}
       <Link href="https://www.pkl.pl/rodo.html">RODO</Link>.
       {errors.permission && <span>Pole jest wymagane.</span>}
      </label>
  </div>


  <div id = "firstName" className={styles["form-group-fake"]}>
  <label className={styles.label} htmlFor="firstName">Imię i nazwisko</label>
    <input {...register("firstName")} type="text" id="firstName" name="firstName" className={styles["form-control"]} />
  </div>
</form>
    )
}