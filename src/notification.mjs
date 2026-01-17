function showNotification(message) {
    // Create notification element
    const notification = document.createElement("div");

    // Premium styling with glassmorphism and elegant typography
    notification.style.position = "fixed";
    notification.style.top = "2rem";
    notification.style.right = "2rem";
    notification.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    notification.style.color = "white";
    notification.style.padding = "1rem 2rem";
    notification.style.zIndex = "9999";
    notification.style.fontFamily = "'Inter', sans-serif";
    notification.style.fontSize = "11px";
    notification.style.fontWeight = "600";
    notification.style.letterSpacing = "0.2em";
    notification.style.textTransform = "uppercase";
    notification.style.opacity = "0";
    notification.style.transform = "translateY(-1rem) scale(0.95)";
    notification.style.transition = "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    notification.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
    notification.style.backdropFilter = "blur(10px)";
    notification.style.border = "1px solid rgba(255, 255, 255, 0.1)";

    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateY(0) scale(1)";
    });

    // Remove after duration
    setTimeout(() => {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(-1rem) scale(0.95)";
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 500);
    }, 3500);
}

export default showNotification;