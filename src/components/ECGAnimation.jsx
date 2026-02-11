import React, { useEffect, useRef } from 'react';

const ECGAnimation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let width, height, x = 0;
        let lastY;
        const speed = 6;
        const heartPattern = [0, 0, 2, -4, 0, 0, -15, 80, -25, 0, 5, 12, 5, 0, 0];
        let pIndex = 0;

        const init = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            lastY = height / 2;
            ctx.clearRect(0, 0, width, height);
        };

        const draw = () => {
            // Easing old data
            ctx.clearRect(x, 0, 60, height);

            ctx.beginPath();
            ctx.strokeStyle = '#ff0000ff'; // Cyan
            ctx.lineWidth = 4;           // Adjusted for better look
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // Neon Glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff0000ff';

            let targetY = height / 2;

            if (pIndex === 0 && Math.random() > 0.94) {
                pIndex = 1;
            }

            if (pIndex > 0 && pIndex < heartPattern.length) {
                targetY -= heartPattern[pIndex] * (height / 250);
                pIndex++;
            } else {
                pIndex = 0;
                targetY += (Math.random() - 0.5) * 10;
            }

            ctx.moveTo(x - speed, lastY);
            ctx.lineTo(x, targetY);
            ctx.stroke();

            // Reset shadow for performance
            ctx.shadowBlur = 0;

            lastY = targetY;
            x += speed;

            if (x > width) {
                x = 0;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener('resize', init);
        init();
        draw();

        return () => {
            window.removeEventListener('resize', init);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        />
    );
};

export default ECGAnimation;
