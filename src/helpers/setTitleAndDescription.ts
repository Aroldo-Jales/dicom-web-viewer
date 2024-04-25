/* eslint-disable @typescript-eslint/no-explicit-any */
export default function setTitleAndDescription(titleText: any, descriptionText: any) {
  const title = document.getElementById('demo-title');
  const description = document.getElementById('demo-description');

  title!.innerText = titleText;
  description!.innerText = descriptionText;
}
