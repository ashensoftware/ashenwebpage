
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { Container } from '@/components/ui/Container';
import { BackgroundPaths } from '@/features/animations/BackgroundPaths'; // Leveraging existing background
import { Home, RefreshCw } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
            <BackgroundPaths className="absolute inset-0 z-0 opacity-50" />

            <Container className="relative z-10 flex flex-col items-center text-center">

                {/* 404 Visual */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="mb-8 relative"
                >
                    <Typography
                        variant="h1"
                        className="text-[150px] md:text-[250px] leading-none font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none"
                    >
                        404
                    </Typography>
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-brand-primary/20 blur-[50px]" />
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <Typography variant="h2" className="mb-4">
                        Page Not Found
                    </Typography>
                    <Typography className="text-text-secondary max-w-md mx-auto mb-10 text-lg">
                        The dimension you are looking for does not exist... or maybe the link is broken.
                    </Typography>

                    <div className="flex gap-4 justify-center">
                        <Button variant="primary" onClick={() => navigate('/')}>
                            <Home size={18} className="mr-2" /> Back Home
                        </Button>
                        <Button variant="secondary" onClick={() => window.location.reload()}>
                            <RefreshCw size={18} className="mr-2" /> Reload
                        </Button>
                    </div>
                </motion.div>

            </Container>
        </div>
    );
};
