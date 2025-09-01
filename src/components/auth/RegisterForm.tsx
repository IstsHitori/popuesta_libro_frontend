import { Link } from "react-router-dom";
import HeaderForm from "./HeaderForm";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { LuUniversity } from "react-icons/lu";
import { MdFormatListNumberedRtl } from "react-icons/md";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import { PiGenderFemaleBold } from "react-icons/pi";
import { PiGenderMaleBold } from "react-icons/pi";
import { IoMdPersonAdd } from "react-icons/io";

export default function RegisterForm() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mostrar el formulario al montar el componente
    setVisible(true);
  }, []);

  return (
    <>
      <div
        id="register-screen"
        className={`fixed inset-0 w-screen h-screen bg-cover bg-center flex justify-center items-center z-[1000] bg-[url('/niveles/templo-de-la-integracion-_2_.png')] transition-all duration-500 ${
          visible
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-black/70 backdrop-blur-lg rounded-2xl p-10 shadow-2xl max-w-[450px] w-[90%] text-center border border-white/20 max-h-[90vh] overflow-y-auto">
          {/* Header del formulario */}
          <HeaderForm />

          {/* Formulario de registro */}
          <form id="register-form" className="block text-left">
            <h2 className="text-white mb-5 text-center text-2xl font-semibold">
              ¡Únete a la aventura!
            </h2>
            <InputField
              label="Nombre completo"
              type="text"
              Icon={<MdDriveFileRenameOutline className="text-blue-500" />}
            />

            <InputField
              label="Edad"
              type="number"
              Icon={<LiaBirthdayCakeSolid className="text-yellow-500" />}
            />

            <InputField
              label="Institución educativa"
              type="text"
              Icon={<LuUniversity className="text-green-500" />}
            />

            <InputField
              label="Número de documento"
              type="number"
              Icon={<MdFormatListNumberedRtl className="text-purple-500" />}
            />

            <div className="mb-5">
              <label className="block mb-2 text-white font-semibold text-sm">
                Género:
              </label>
              <div className="flex gap-4 justify-center">
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    id="gender-male"
                    name="gender"
                    value="Masculino"
                    className="peer hidden"
                  />
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 border-2 border-white/20 text-blue-400 text-2xl transition-all duration-200 peer-checked:bg-indigo-700 peer-checked:border-indigo-600 peer-checked:scale-110 peer-checked:shadow-[0_4px_15px_rgba(79,70,229,0.5)] hover:bg-white/30 hover:border-indigo-400">
                    <PiGenderMaleBold />
                  </span>
                  <span className="text-white text-sm font-medium mt-1">
                    Masculino
                  </span>
                </label>
                <label className="flex flex-col items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    id="gender-female"
                    name="gender"
                    value="Femenino"
                    className="peer hidden"
                  />
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 border-2 border-white/20 text-pink-400 text-2xl transition-all duration-200 peer-checked:bg-indigo-700 peer-checked:border-indigo-600 peer-checked:scale-110 peer-checked:shadow-[0_4px_15px_rgba(79,70,229,0.5)] hover:bg-white/30 hover:border-indigo-400">
                    <PiGenderFemaleBold />
                  </span>
                  <span className="text-white text-sm font-medium mt-1">
                    Femenino
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-8 bg-indigo-700/80 text-white border-none rounded-md font-semibold cursor-pointer transition flex items-center justify-center gap-2 shadow-md backdrop-blur-xl hover:-translate-y-1 hover:shadow-lg hover:bg-indigo-700/90 active:-translate-y-0.5 text-md"
              
            >
              <IoMdPersonAdd />
              Crear Cuenta
            </button>
          </form>

          {/* Enlace para cambiar a login */}
          <div className="text-center mt-5 text-white text-sm">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/auth/login"
              className="text-white font-semibold transition hover:text-indigo-300 hover:underline"
            >
              Inicia sesión aquí
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
