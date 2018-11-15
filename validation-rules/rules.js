module.exports = {
	login:{
		email:{
			type: "email",
			required: true,
			message: "Not a valid email."
		},
		pass:{
			required:true,
			min:6,
			message: "Password Is required and length must be atleast 6."
		}
	},
	register:{
		email:{
			type: "email",
			required: true,
			message: "Not a valid email."
		},
		pass:{
			required:true,
			min:6,
			message: "Password Is required and length must be atleast 6."
		},
		rpass:{
			required:true,
			min:6,
			message: "Confirm Password Is required and length must be atleast 6."
		}

	},
	post:{
		title:{
			required:true,
			min:20,
			max:200,
			message: "The title must be atleast 20 charecters long.(Maximim 200 charecter)"
		},
		content:{
			required:true,
			min:50,
			max:1000,
			message: "The title must be atleast 50 charecters long.(Maximim 1000 charecter)"
		},
		category:{
			required:true,
			message:"Category must be selected."
		}
	},
	reply:{
		reply:{
			required:true,
			message:"Must contain some charecter" 
		}
	}
};