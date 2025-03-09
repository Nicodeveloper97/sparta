import { useState, FormEvent } from "react";
import { Image } from "../atoms/Image";
import { Text } from "../atoms/Text";
import CalImg from "../../assets/gym/9.jpeg";
import { Fade } from "react-awesome-reveal";
import { FaUser, FaWeight, FaRulerVertical, FaRunning, FaBullseye } from "react-icons/fa";

const Calculator = () => {
    const [age, setAge] = useState<string>('');
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
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

        // Fórmula de Harris-Benedict para hombres
        const TMB = 66 + (13.7 * weightInKg) + (5 * heightInCm) - (6.8 * ageInYears);

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
            <main className="w-full lg:h-[800px] grid md:grid-cols-2 items-center gap-10 md:gap-0 lg:gap-8">

                {/* Sección del formulario */}
                <div className="h-full w-full md:order-1 order-2 pt-8 md:pt-0 lg:px-8 px-4 flex flex-col lg:justify-center justify-center items-start lg:gap-12 gap-8">
                    <Fade className="w-full">
                        <div className="w-full flex flex-col mt-6 items-center relative before:absolute before:-bottom-6 before:left-38 before:w-20 before:h-1 before:rounded-lg before:bg-gradient-to-r from-[#690b0b] to black z-10">
                            <Text as="p" className="text-[#7a0707] lg:text-sm text-xs tracking-widest uppercase font-medium">Advanced Calculator</Text>
                            <Text as="h1" className="text-zinc-100 lg:text-5xl md:text-4xl text-3xl">Calcula tu TDEE</Text>
                            <Text as="h1" className="absolute text-zinc-500/10 lg:left-52 md:left-32 left-36 lg:text-9xl md:text-7xl text-6xl font-extrabold lg:-top-32 md:-top-20 -top-16 -z-10">04</Text>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={calculateTDEE} className="w-full max-w-md bg-zinc-800 p-6 rounded-lg shadow-lg">
                            <div className="mb-4 relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="Edad"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    className="w-full pl-10 p-2 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <FaWeight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="Peso (kg)"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    className="w-full pl-10 p-2 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <FaRulerVertical className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="number"
                                    placeholder="Altura (cm)"
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                    className="w-full pl-10 p-2 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                />
                            </div>

                            <div className="mb-4 relative">
                                <FaRunning className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={activityLevel}
                                    onChange={(e) => setActivityLevel(e.target.value)}
                                    className="w-full pl-10 p-2 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
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
                                    className="w-full pl-10 p-2 rounded-lg border-2 border-gray-700 bg-zinc-900 text-white focus:outline-none focus:border-[#690b0b]"
                                >
                                    <option value="maintain">Mantener el peso</option>
                                    <option value="gain">Ganar masa muscular</option>
                                    <option value="lose">Bajar porcentaje de grasa</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#690b0b] text-white p-2 rounded-lg hover:bg-[#7a0707] transition duration-300"
                            >
                                Calcular
                            </button>
                        </form>

                        {/* Respuesta */}
                        {calories && (
                            <Fade delay={300} triggerOnce>
                                <div className="mt-6 w-full max-w-md bg-[#1a1a1a] p-4 rounded-lg shadow-lg border border-[#690b0b]">
                                    <Text as="h2" className="text-xl text-white text-center mb-2">
                                        Tus calorías recomendadas son:
                                    </Text>
                                    <Text as="h3" className="text-3xl text-[#7a0707] font-bold text-center">
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

                {/* Sección de la imagen */}
                <div className="w-full lg:h-[800px] md:h-[600px] h-[300px] md:order-2 order-1 grid">
                    <Image alt="Offer Image" objectCover="object-cover" className="w-full h-full" image={CalImg} />
                </div>
            </main>
        </section>
    );
};

export default Calculator;