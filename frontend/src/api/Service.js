let url = "https://192.168.1.6:2002";
export default class APIService {
  static async PostData(body, route) {
    try {
      Response = await fetch(url.concat(route), {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(body),
      }).then(async (res) => {
        return res;
      });
      return await Response.json();
    } catch (error) {
      return console.log(error);
    }
  }
}
