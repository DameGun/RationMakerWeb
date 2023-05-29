export async function submitForm(service, data) {
  return new Promise(async (resolve, reject) => {
    let shouldError = await service(data);
    if (shouldError.ok) {
      resolve(shouldError.json());
    } else {
      reject({ response: shouldError });
    }
  });
}
