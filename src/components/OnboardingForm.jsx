import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import { allCountries } from 'country-region-data';

const OnboardingForm = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: null,
        city: null,
        zipCode: '',
        interest: ''
    });

    const countries = useMemo(() => {
        return allCountries.map(c => ({
            label: c[0],
            value: c[1],
            regions: c[2]
        }));
    }, []);

    const cities = useMemo(() => {
        if (!formData.country) return [];
        return formData.country.regions.map(r => ({
            label: r[0],
            value: r[1]
        }));
    }, [formData.country]);

    const selectStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 0,
            padding: '10px 0',
            fontSize: '1.5rem',
            color: 'white',
            boxShadow: 'none',
            '&:hover': {
                borderBottom: '2px solid #DBFF00'
            }
        }),
        input: (provided) => ({
            ...provided,
            color: 'white',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'white',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: 'rgba(255, 255, 255, 0.1)',
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '15px',
            overflow: 'hidden',
            zIndex: 100
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#DBFF00' : state.isFocused ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
            color: state.isSelected ? 'black' : 'white',
            cursor: 'pointer',
            padding: '15px 20px',
            '&:active': {
                backgroundColor: '#DBFF00',
                color: 'black'
            }
        })
    };

    const [direction, setDirection] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setStep(0);
            setIsSubmitting(false);
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    const nextStep = () => {
        setDirection(1);
        setStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (step > 0) {
            setDirection(-1);
            setStep(prev => prev - 1);
        }
    };

    const handleInterest = async (val) => {
        const finalData = { ...formData, interest: val };
        setFormData(finalData);
        setIsSubmitting(true);

        const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbydXlZqpna42FzLPFJa7MTSHGB4Vl3M0gIZkIhHM62GApiduNfT80tPczogMs6teSki/exec";

        try {
            // Using URLSearchParams for better compatibility with Google Apps Script
            const params = new URLSearchParams();
            params.append('name', finalData.name);
            params.append('email', finalData.email);
            params.append('country', finalData.country?.label || '');
            params.append('city', finalData.city?.label || '');
            params.append('zipCode', finalData.zipCode);
            params.append('interest', finalData.interest);

            await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString(),
            });

            nextStep();
        } catch (error) {
            console.error("Submission failed:", error);
            // Move to success anyway to not block user, or could show error
            nextStep();
        } finally {
            setIsSubmitting(false);
        }
    };

    const steps = [
        {
            id: 'welcome',
            title: 'Welcome to Dhritam',
            question: 'Are you ready to synchronize your heart and mind?',
            type: 'intro'
        },
        {
            id: 'name',
            title: 'Identity',
            question: 'What should we call you?',
            type: 'input',
            placeholder: 'Enter your full name',
            field: 'name'
        },
        {
            id: 'email',
            title: 'Gateway',
            question: 'Where can we send your invitation?',
            type: 'input',
            placeholder: 'email@example.com',
            field: 'email'
        },
        {
            id: 'location',
            title: 'Origin',
            question: 'Where are you from?',
            type: 'location'
        },
        {
            id: 'zip',
            title: 'Coordinates',
            question: 'What is your local zip/pin code?',
            type: 'input',
            placeholder: 'Zip/Postal Code',
            field: 'zipCode'
        },
        {
            id: 'interest',
            title: 'Purpose',
            question: 'How can Dhritam serve you best?',
            type: 'options',
            options: [
                { id: 'demo', label: 'Book a Free Demo', description: 'See the technology in action.' },
                { id: 'waitlist', label: 'Join the Beta', description: 'Early access to the ecosystem.' },
                { id: 'protect', label: 'Clinical Support', description: 'Post-surgical cardiac care.' }
            ]
        },
        {
            id: 'success',
            title: 'Synchronized',
            question: 'Your journey has begun.',
            type: 'success'
        }
    ];

    const currentStepData = steps[step];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 bg-black/95 backdrop-blur-3xl"
                >


                    <div className="w-full max-w-[600px] relative">
                        {/* Progress Bar */}
                        {step < steps.length - 1 && (
                            <div className="absolute -top-12 left-0 w-full flex gap-2">
                                {steps.slice(0, -1).map((_, i) => (
                                    <div
                                        key={i}
                                        className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-accent shadow-[0_0_10px_rgba(219,255,0,0.5)]' : 'bg-white/10'}`}
                                    />
                                ))}
                            </div>
                        )}

                        <motion.div
                            layout
                            className="bg-white/5 border border-white/10 rounded-[30px] p-8 md:p-14 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative"
                        >
                            {/* Close Button Inside Card */}
                            <span
                                onClick={onClose}
                                className="absolute top-4 left-4  w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 text-white/40 hover:text-white hover:bg-white/20 transition-all z-[220]"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </span>
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={step}
                                    custom={direction}
                                    initial={{ opacity: 0, x: direction * 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction * -50 }}
                                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                    className="flex flex-col gap-8"
                                >
                                    <div className="flex flex-col gap-2 mt-10">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold font-outfit">
                                            {currentStepData.title}
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight font-outfit">
                                            {currentStepData.question}
                                        </h2>
                                    </div>

                                    {currentStepData.type === 'intro' && (
                                        <span
                                            onClick={nextStep}
                                            className="group w-full bg-white text-black font-bold py-6 rounded-2xl flex items-center justify-center gap-3 transition-all hover:bg-accent active:scale-[0.98]"
                                        >
                                           <span className='flex items-center '> Begin Onboarding
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg></span>
                                        </span>
                                    )}

                                    {currentStepData.type === 'input' && (
                                        <div className="flex flex-col gap-8">
                                            <input
                                                autoFocus
                                                type={currentStepData.field === 'email' ? 'email' : 'text'}
                                                placeholder={currentStepData.placeholder}
                                                value={formData[currentStepData.field]}
                                                onChange={(e) => setFormData({ ...formData, [currentStepData.field]: e.target.value })}
                                                onKeyDown={(e) => e.key === 'Enter' && formData[currentStepData.field] && nextStep()}
                                                className="w-full bg-transparent border-b-2 border-white/10 py-6 text-2xl md:text-3xl text-white focus:outline-none focus:border-accent transition-all placeholder:text-white/10"
                                            />
                                            <div className="flex justify-between items-center">
                                                <span
                                                    onClick={prevStep}
                                                    className="text-white/40 hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                    Back
                                                </span>
                                                <span
                                                    disabled={!formData[currentStepData.field]}
                                                    onClick={() => formData[currentStepData.field] && nextStep()}
                                                    className="bg-white text-black px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-accent disabled:bg-white/10 disabled:text-white/20 transition-all active:scale-[0.95]"
                                                >
                                                    Next Step
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {currentStepData.type === 'location' && (
                                        <div className="flex flex-col gap-6">
                                            <div className="flex flex-col gap-8">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">Country</span>
                                                    <Select
                                                        options={countries}
                                                        styles={selectStyles}
                                                        value={formData.country}
                                                        onChange={(val) => setFormData({ ...formData, country: val, city: null })}
                                                        placeholder="Select Country"
                                                        formatOptionLabel={({ label, value }) => (
                                                            <div className="flex items-center gap-3">
                                                                <img 
                                                                    src={`https://flagcdn.com/w40/${value.toLowerCase()}.png`} 
                                                                    alt={label}
                                                                    className="w-6 h-auto rounded-sm"
                                                                />
                                                                <span>{label}</span>
                                                            </div>
                                                        )}
                                                    />
                                                </div>

                                                <div className={`flex flex-col gap-2 transition-all duration-500 ${!formData.country ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
                                                    <span className="text-[10px] uppercase tracking-widest text-white/80 font-bold">City / Region</span>
                                                    <Select
                                                        options={cities}
                                                        styles={selectStyles}
                                                        value={formData.city}
                                                        onChange={(val) => setFormData({ ...formData, city: val })}
                                                        placeholder="Select City"
                                                        isDisabled={!formData.country}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center mt-4">
                                                <span
                                                    onClick={prevStep}
                                                    className="text-white/40 hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors"
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                    Back
                                                </span>
                                                <span
                                                    disabled={!formData.country || !formData.city}
                                                    onClick={() => formData.country && formData.city && nextStep()}
                                                    className="bg-white text-black px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-accent disabled:bg-white/10 disabled:text-white/20 transition-all active:scale-[0.95]"
                                                >
                                                    Next Step
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {currentStepData.type === 'options' && (
                                        <div className="flex flex-col gap-3 relative">
                                            {isSubmitting && (
                                                <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                                                        <span className="text-white/70 font-bold uppercase tracking-widest text-xs">Synchronizing...</span>
                                                    </div>
                                                </div>
                                            )}
                                            {currentStepData.options.map((opt) => (
                                                <span
                                                    key={opt.id}
                                                    disabled={isSubmitting}
                                                    onClick={() => handleInterest(opt.id)}
                                                    className={`w-full text-left p-6 rounded-3xl border transition-all duration-300 group ${formData.interest === opt.id ? 'bg-accent border-accent text-black' : 'bg-white/5 border-white/5 text-white hover:border-white/20 hover:bg-white/10'} ${isSubmitting ? 'opacity-50' : ''}`}
                                                >
                                                    <div className="flex justify-between items-center mb-1">
                                                        <span className="text-xl font-bold font-outfit uppercase tracking-tight">{opt.label}</span>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                                    </div>
                                                    <p className={`text-sm ${formData.interest === opt.id ? 'text-black/60' : 'text-white/40'}`}>
                                                        {opt.description}
                                                    </p>
                                                </span>
                                            ))}
                                            <span
                                                disabled={isSubmitting}
                                                onClick={prevStep}
                                                className="mt-6 text-white/40 hover:text-white text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors justify-center disabled:opacity-30"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                                Change Input
                                            </span>
                                        </div>
                                    )}

                                    {currentStepData.type === 'success' && (
                                        <div className="flex flex-col items-center text-center gap-8 py-4">
                                            <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center animate-pulse">
                                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                            <div className="space-y-4">
                                                <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed">
                                                    We will reach out to you at <span className="text-white font-bold">{formData.email}</span> shortly.
                                                </p>
                                            </div>
                                            <span
                                                onClick={onClose}
                                                className="w-full bg-white text-black font-bold py-5 rounded-2xl hover:bg-accent transition-all uppercase tracking-widest text-sm"
                                            >
                                                Close Sanctuary
                                            </span>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OnboardingForm;
