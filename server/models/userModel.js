import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide a username"],
      unique: [true, "Username already exists"],
    },
    displayname: {
      type: String,
      //   default: this.username,
      //   required: [true, "Please provide a display name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: [true, "Email already exists"],
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords do not match",
      },
      select: false,
    },
    photo: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    tasks: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.displayname || this.displayname == "") {
    this.displayname = this.username;
  }
  next();
});

userSchema.pre("save", async function (next) {
  // Run this if the password is updated or the user is new
  if (this.isModified("password") || this.isNew) {
    this.passwordConfirm = undefined;
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.pre(/^find/, function (next) {
  this.populate({
    path: "tasks",
    select: "-__v -updatedAt",
  });
  next();
});

userSchema.methods.correctPassword = async function (
  userPassword,
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
