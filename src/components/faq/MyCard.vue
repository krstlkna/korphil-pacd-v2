<template>
    <div class="card" href="#">
        <h3>This is option 1</h3>
        <p class="small">Card description with lots of great facts and interesting details.</p>
        <div class="go-corner" href="#">
            <div class="go-arrow">
                →
            </div>
        </div>
    </div>
</template>
<style>
.card {
    display: block;
    position: relative;
    max-width: 262px;
    background-color: #f2f8f9;
    border-radius: 4px;
    padding: 32px 24px;
    margin: 12px;
    text-decoration: none;
    z-index: 0;
    overflow: hidden;

    &:before {
        content: "";
        position: absolute;
        z-index: -1;
        top: -16px;
        right: -16px;
        background: #00838d;
        height: 32px;
        width: 32px;
        border-radius: 32px;
        transform: scale(1);
        transform-origin: 50% 50%;
        transition: transform 0.25s ease-out;
    }

    &:hover:before {
        transform: scale(21);
    }
}

/* .card1:hover {
    p {
        transition: all 0.3s ease-out;
        color: rgba(255, 255, 255, 0.8);
    }

    h3 {
        transition: all 0.3s ease-out;
        color: #ffffff;
    }
} */
</style>