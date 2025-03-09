import { useState, FormEvent } from "react";
import { Image } from "../atoms/Image";
import { Text } from "../atoms/Text";
import CalImg from "../../assets/gym/9.jpeg";
import { Fade } from "react-awesome-reveal";
import { FaUser, FaWeight, FaRulerVertical, FaRunning, FaBullseye, FaVenusMars } from "react-icons/fa";

const Calculator = () => {
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [gender, setGender] = useState<string>('male'); // Género por defecto
    const [activityLevel, setActivityLevel] = useState<string>('1.375'); // Ligeramente activo por defecto
    const [goal, setGoal] = useState<string>('maintain'); // Objetivo por defecto es "mantener"
    const [calories, setCalories] = useState<string | null>(null);

    // Función para calcular TDEE
    const calculateTDEE = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verificar que los campos no estén vacíos
        if (!age || !weight || !height) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const heightInCm = parseInt(height);
        const weightInKg = parseInt(weight);
        const ageInYears = parseInt(age);
        let TMB: number;

        // Fórmula de Harris-Benedict según el género
        if (gender === 'male') {
            // Fórmula para hombres
            TMB = 66 + (13.7 * weightInKg) + (5 * heightInCm) - (6.8 * ageInYears);
        } else {
            // Fórmula para mujeres
            TMB = 655 + (9.6 * weightInKg) + (1.8 * heightInCm) - (4.7 * ageInYears);
        }

        // Calcular las calorías diarias según el nivel de actividad
        const dailyCalories = TMB * parseFloat(activityLevel);

        // Ajustar según el objetivo
        let finalCalories = dailyCalories;

        if (goal === 'gain') {
            finalCalories += 250; // Superávit para ganar masa muscular
        } else if (goal === 'lose') {
            finalCalories -= 250; // Déficit para perder grasa
        }

        setCalories(finalCalories.toFixed(2)); // Guardamos el resultado en el estado
    };

    return (
        <section className="w-full h-auto flex items-center bg-zinc-900">
            <main className="w-full grid md:grid-cols-2 items-center gap-6">

                {/* Sección del formulario - Optimizada para móvil */}
                <div className="w-full md:order-1 order-2 px-4 md:px-8 py-8 flex flex-col items-center">
                    <Fade className="w-full">
                        <div className="w-full flex flex-col items-center text-center relative mb-8">
                            <Text as="p" className="text-[#7a0707] text-xs md:text-sm tracking-widest uppercase font-medium">
                                Advanced Calculator
                            </Text>
                            <Text as="h1" className="text-zinc-100 text-3xl md:text-4xl lg:text-5xl">
                                Calcula tu TDEE
                            </Text>
                            <div className="absolute w-20 h-1 rounded-lg bg-gradient-to-r from-[#690b0b] to-black bottom-0 mt-4"></div>
                            <Text as="h1" className="absolute text-zinc-500/10 text-6xl md:text-7xl lg:text-9xl font-extrabold -z-10 opacity-25">
                                04
                            </Text>
                        </div>

                        {/* Formulario - Mejorado para móvil */}
                        <form onSubmit={calculateTDEE} className="w-full max-w-md mx-auto bg-zinc-800 p-5 md:p-6 rounded-lg shadow-lg">
                            <div className="mb-3 relative">
                                <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full pl-10 p-3 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                >
                                    <option value="male">Hombre</option>
                                    <option value="female">Mujer</option>
                                </select>
                            </div>
                            
                            <div className="mb-3 relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="Edad"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full pl-10 p-3 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                />
                            </div>

                            <div className="mb-3 relative">
                                <FaWeight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="Peso (kg)"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full pl-10 p-3 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                />
                            </div>

                            <div className="mb-3 relative">
                                <FaRulerVertical className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="Altura (cm)"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full pl-10 p-3 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                />
                            </div>

                            <div className="mb-3 relative">
                                <FaRunning className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={activityLevel}
                                    onChange={(e) => setActivityLevel(e.target.value)}
                                    className="w-full pl-10 p-3 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                >
                                    <option value="1.2">Sedentario</option>
                                    <option value="1.375">Ligeramente Activo</option>
                                    <option value="1.55">Activo</option>
                                    <option value="1.725">Muy Activo</option>
                                </select>
                            </div>

                            <div className="mb-4 relative">
                                <FaBullseye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={goal}
                                    onChange={(e) => setGoal(e.target.value)}
                                    className="w-full pl-10 p-3 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                >
                                    <option value="maintain">Mantener el peso</option>
                                    <option value="gain">Ganar masa muscular</option>
                                    <option value="lose">Bajar porcentaje de grasa</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#690b0b] text-white p-3 rounded-lg hover:bg-[#7a0707] transition duration-300 font-medium text-lg"
                            >
                                Calcular
                            </button>
                        </form>

                        {/* Respuesta - Mejorada para móvil */}
                        {calories && (
                            <Fade delay={300} triggerOnce>
                                <div className="mt-6 w-full max-w-md mx-auto bg-[#1a1a1a] p-5 rounded-lg shadow-lg border border-[#690b0b]">
                                    <Text as="h2" className="text-lg md:text-xl text-white text-center mb-2">
                                        Tus calorías recomendadas son:
                                    </Text>
                                    <Text as="h3" className="text-2xl md:text-3xl text-[#7a0707] font-bold text-center">
                                        {calories} kcal/día
                                    </Text>
                                    <Text as="p" className="text-sm text-gray-300 mt-2 text-center">
                                        Este es el total de calorías que necesitas para{" "}
                                        {goal === 'maintain'
                                            ? 'mantener tu peso'
                                            : goal === 'gain'
                                            ? 'ganar masa muscular'
                                            : 'bajar el porcentaje de grasa'}
                                        .
                                    </Text>
                                </div>
                            </Fade>
                        )}
                    </Fade>
                </div>

                {/* Sección de la imagen - Optimizada para móvil */}
                <div className="w-full h-[250px] sm:h-[300px] md:h-[500px] lg:h-[650px] md:order-2 order-1">
                    <Image 
                        alt="Offer Image" 
                        objectCover="object-cover" 
                        className="w-full h-full" 
                        image={CalImg} 
                    />
                </div>
            </main>
        </section>
    );
};

export default Calculator;