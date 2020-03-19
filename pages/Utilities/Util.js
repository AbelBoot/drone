export function main (b, p, c){
	console.log("b", b)
	for (let i = 0; i < b.length ; i+4){
		b[4*i + 0] = Math.abs(c[4*i + 0] - p[4*i + 0])
		b[4*i + 1] = Math.abs(c[4*i + 1] - p[4*i + 1])
		b[4*i + 2] = Math.abs(c[4*i + 2] - p[4*i + 2])
		b[4*i + 3] = 255
		i++
	}
	return b
}