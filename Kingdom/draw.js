function draw(time) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	parallax.draw.repeatX(hills);
	parallax.draw.repeatX(trees);
	parallax.draw.repeatX(cobblestones);
	sprite.draw(king.graphic, king);
	
	/*
	ctx.save();
	ctx.beginPath();
	var c = parallax({ x: king.x, y: king.y });
	ctx.moveTo(c.x, 0);
	ctx.lineTo(c.x, canvas.height);
	ctx.lineWidth = 2; ctx.strokeStyle = "red"; ctx.stroke();
	ctx.restore();
	//*/
}