'use client'
import React, { useState, useEffect } from 'react';
import '@/app/ui/login.css';
import { useFormState, useFormStatus } from 'react-dom';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { UserContext, UserContextType } from '../context/UserContext';
import { Button } from '@/app/ui/button';
import { signIn } from "next-auth/react";
// import { authenticate } from '@/app/lib/action';
import { IUser } from '../../domain/IUser';
import { useRouter } from "next/navigation";
const LoginForm: React.FC = () => {
  const [errorLogin, setErrorLogin] = useState<string | null>(null)
  const [showLoginForm, setShowLoginForm] = useState<boolean>(true);
  const { currentUser, setCurrentUser, isEdit, setIsEdit, registerUser} = React.useContext(UserContext) as UserContextType;
  const [registered, setRegistered] = useState<string | null>(null);
  const router = useRouter();
  const [email, setEmail] = useState<string>("daniel@gmail.com");
  const [password, setPassword] = useState<string>("123456Df");
  // const [role,setRole] = useState<IUser | null>(null)
  const roles = ['Admin', 'Viewer', 'Operator'];
  // Ajusta el formulario visible según el ancho de pantalla
  const handleResize = (): void => {
    if (window.innerWidth > 850) {
      setShowLoginForm(true);
    }
  };

  // let errorRegister 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorLogin(null);
    // setErrors([]);

    const responseNextAuth = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    // console.log("responseNextAuth: ", responseNextAuth)

    if (responseNextAuth?.error) {
      // console.log("Error: ", responseNextAuth.error)
      setErrorLogin(responseNextAuth.error);
      return;
    }
    router.push("/dashboard");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setCurrentUser((prevUser: IUser) => ({ ...prevUser, [name]: value }));
};

const handleSubmitRegister = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();
  setRegistered(null); // Reinicia el estado de registro

  try {
    // Llama a la función para registrar al usuario
    const resp = await registerUser(currentUser);
    // console.log("resp", resp)
    // Establece el mensaje de éxito si el registro fue exitoso
    setRegistered("User successfully registered");

    // Intenta iniciar sesión automáticamente después del registro
    const responseNextAuth = await signIn("credentials", {
      email: currentUser.email, // Usa el email registrado
      password: currentUser.password, // Usa la contraseña registrada
      redirect: false, // Redirige manualmente después
    });

    if (responseNextAuth?.error) {
      console.error("Error al iniciar sesión después del registro:", responseNextAuth.error);
      setRegistered("Error during login after registration");
      return;
    }

    // Redirige al dashboard
    router.push("/dashboard");
  } catch (err) {
    console.error("Error durante el registro:", err);
    setRegistered("The email is already registered");
  }
};
;

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const iniciarSesion = (): void => setShowLoginForm(true);
  const register = (): void => setShowLoginForm(false);

  return (
    <div className="App">
      <main>
        <div className={`contenedor__todo ${showLoginForm ? 'show-login' : 'show-register'}`}>
          {/* Caja trasera */}
          <div className="caja__trasera">
            <div className="caja__trasera-login">
              <h3>¿Ya tienes una cuenta?</h3>
              <p>Inicia sesión para entrar en la página</p>
              <button onClick={iniciarSesion}>Iniciar Sesión</button>
            </div>
            <div className="caja__trasera-register">
              <h3>¿Aún no tienes una cuenta?</h3>
              <p>Regístrate para que puedas iniciar sesión</p>
              <button onClick={register}>Registrarse</button>
            </div>
          </div>
          {/* Login y Register */}
          <div className="contenedor__login-register">
            {/* Login */}
            <form onSubmit={handleSubmit} className="formulario__login">
              <h2>Iniciar Sesión</h2>
              <input type="text" name="email" placeholder="Correo Electrónico" 
              value={email} onChange={(event) => setEmail(event.target.value)}
              pattern="^\w+([.\-_+]?[\w]+)*@\w+([.\-_]?\w+)*(\.\w{2,10})+$" />
              <input type="password" name="password" placeholder="Contraseña" required
              value={password} onChange={(event)=> setPassword(event.target.value)}
              />
              <LoginButton />
              <button
                onClick={() => signIn("google", {callbackUrl:"/dashboard"})}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Iniciar sesión con Google
              </button>
                <div  
              className="flex h-8 items-end space-x-1"
              aria-live='polite'
              aria-atomic='true'>
                {errorLogin && (
                  <>
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{errorLogin}</p>
                </>
                )}
              </div>
            </form>

            {/* Register */}
            <form onSubmit={handleSubmitRegister} className="formulario__register">
              <h2>Registrarse</h2>
              <input onChange={handleChange} required type="text" placeholder="Name" name='name'
              pattern='^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,50}$'/>
              <input onChange={handleChange} required type="text" placeholder="Lastname" name='lastname'
              pattern='^[A-Za-zÀ-ÖØ-öø-ÿ ]{3,50}$'/>
              <input onChange={handleChange} required type="number" placeholder="Phone number" name='phonenumber'
              pattern='/^\d{7,15}$'/>
              <input onChange={handleChange} required type="text" placeholder="Email" name='email'
              pattern="^\w+([.\-_+]?[\w]+)*@\w+([.\-_]?\w+)*(\.\w{2,10})+$" />
              <input onChange={handleChange} required type="password" placeholder="Password" name='password'
              pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$'/>
              <label htmlFor='role'>Role:</label>
              <select
                name="role"
                required
                onChange={handleChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Seleccione un rol
                </option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <RegisterButton />
              <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
              >
                {registered=="Error"? (
                  <>  
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-500">{registered}</p>
                </>
                ) : 
                <p className="text-sm text-green-500">{registered}</p>
                }
                </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default LoginForm;
function LoginButton() {
    const { pending } = useFormStatus();
    return (
      <Button className="mt-4 w-full" aria-disabled={pending}>
        Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </Button>
    );
  }

  function RegisterButton() {
    const { pending } = useFormStatus();
    return (
      <button type="submit" className="mt-4 w-full" aria-disabled={pending}
      // onClick={()=> signIn("credentials", {callbackUrl: "/dashboard"})}
      > Register <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
      </button>
    );
  }