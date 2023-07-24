// import api from "./api";
//
// function getIngredients(setIsLoading, setItems, setBurger) {
// 	setIsLoading(true);
// 	fetch(api)
// 		.then(data => data.json())
// 		.then(response => {
// 			response.data = response.data.map(el => {
// 				return {
// 					...el,
// 					count: 0
// 				}
// 			})
// 			response.data.find(el => el.type === 'bun').count = 1
// 			setItems(response.data);
// 			setBurger(prev => ({
// 				...prev,
// 				bun: {
// 					...response.data.find(el => el.type === 'bun')
// 				}
// 			}))
// 			setIsLoading(false);
// 		})
// 		.catch(e => {
// 			console.error(e);
// 			setIsLoading(false);
// 		})
// }
//
// export default getIngredients;
