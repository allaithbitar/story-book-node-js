import moment from "moment";
import { IStory } from "../interfaces/story.interface";
import { IUser } from "../interfaces/user.interface";

const formatDate = (date: any, format: string) => {
  return moment(date).format(format);
};

const truncate = (str: string, len: number) => {
  if (str.length > len && str.length > 0) {
    let newStr = str + " ";
    newStr = str.substr(0, len);
    newStr = str.substr(0, newStr.lastIndexOf(" "));
    newStr = newStr.length > 0 ? newStr : str.substr(0, len);
    return newStr + "...";
  }
  return str;
};

const stripTags = (storyBody: string) => {
  return storyBody.replace(/<(?:.|\n)*?>/gm, "");
};

const editIcon = (
  storyUser: IStory,
  loggedUser: IUser,
  storyId: string,
  floating: boolean = true
) => {
  if (storyUser._id.toString() == loggedUser._id.toString()) {
    if (floating)
      return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;

    return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
  }
};
const select = (selected: any, options: any) => {
  return options
    .fn(this)
    .replace(new RegExp(' value="' + selected + '"'), '$& selected="selected"')
    .replace(
      new RegExp(">" + selected + "</option>"),
      ' selected="selected"$&'
    );
};

export default { formatDate, truncate, stripTags, editIcon, select };
