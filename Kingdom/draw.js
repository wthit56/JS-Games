function draw(time) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	parallax.draw.repeatX(hills);
	parallax.draw.repeatX(trees);
	parallax.draw.repeatX(cobblestones);
}