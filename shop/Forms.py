from email import message
import email

from wtforms import Form, StringField, RadioField, SelectField, TextAreaField, validators, PasswordField,IntegerField,DateTimeField,FloatField, BooleanField

import datetime
from wtforms.fields.html5 import EmailField ,DateField
from wtforms.widgets import PasswordInput
from wtforms.fields.html5 import EmailField

class Registration(Form):
    first_name = StringField('First Name', [validators.Length(min=1, max=150), validators.DataRequired()])
    last_name = StringField('Last Name', [validators.Length(min=1, max=150), validators.DataRequired()])
    email = EmailField('Email Address', [validators.DataRequired(),
                                        validators.Length(min=4, max=150, message='Please enter a valid email'),
                                        validators.Email()])
    gender = RadioField('Gender', [validators.DataRequired()], choices=[('F', 'Female'), ('M', 'Male')], default='F')
    birthdate= DateField("Date Of Birth",[validators.DataRequired(message='Enter valid date')],format="%Y-%m-%d")
    postal_code = IntegerField('Postal Code', [validators.NumberRange(min=000000,max=999999), 
                                              validators.DataRequired(message='Please enter valid postal code')])
    city = SelectField('City', [validators.DataRequired()],choices=[('Singapore', 'Singapore')], default='Singapore')
    address = StringField('Address', [validators.Length(min=4, max=50),
                                              validators.DataRequired(message='Please enter a valid address')])
    password = PasswordField('Password', [validators.InputRequired(), validators.Length(min=1,max=100),
                                              validators.EqualTo('confirm', message='passwords must match')])
    confirm = PasswordField('Repeat Password',[validators.InputRequired('please re enter password')])
    #date = DateField("Date of creation",[validators.DataRequired(message='Do not change')],format="%Y-%m-%d", default=datetime.datetime.now())

class Login(Form):
    email = EmailField('Email', [validators.Email(), validators.DataRequired(message='Please enter a valid email')])
    password = PasswordField('password',[validators.length( min=1, max=200), validators.DataRequired()])

class CreateOrderForm(Form):
    name = StringField('Name', [validators.Length(min=1, max=150), validators.DataRequired(message='Alphabets only')])
    email = StringField('Email Address', [validators.Length(min=1, max=150), validators.DataRequired()])
    total = FloatField('Total', [validators.DataRequired(message='Numbers only')])
    status = SelectField('Status', [validators.DataRequired(message='Please choose status')], choices=[('', 'N/A'), ('Delivered', 'Delivered'), ('Not Delivered', 'Not Delivered')], default='')
    date = DateField("Date of creation",[validators.DataRequired(message='Do not change')],format="%Y-%m-%d", default=datetime.datetime.now())

class CreateSubscriptionsForm(Form):
    first_name = StringField('First Name', [validators.Length(min=1, max=150), validators.DataRequired()])
    last_name = StringField('Last Name', [validators.Length(min=1, max=150), validators.DataRequired()])
    email = StringField('Email Address', [validators.Email(), validators.DataRequired(message='Please enter a valid email')])

class CreateNewsletterForm(Form):
    newsletter_name = StringField('Name of Newsletter', [validators.DataRequired()])
    message = TextAreaField('Newsletter Content', [validators.DataRequired()])
    create_date = DateField('Date Updated/Created', format="%Y-%m-%d", default=datetime.datetime.now())
    create_by = StringField('Admin', [validators.DataRequired()])

class CreateUnsubscribeForm(Form):
    sub_id = StringField('Subscription ID', [validators.Length(min=1, max=150), validators.DataRequired()])
    email = StringField('Email Address', [validators.Email(), validators.DataRequired(message='Please enter a valid email')])
    rating = SelectField('Rating',[validators.DataRequired()], choices=[('1','1 Star'),('2','2 Stars'),('3','3 Stars'),('4','4 Stars'),('5','5 Stars')])
    reason = SelectField('What is your reason for unsubscribing? ', [validators.DataRequired()], choices=[('Irrelevant Content'), ('Too many emails'), ('Not tailored to my preferences')], default='')
    explaination = TextAreaField('Any further explaination?', [validators.Length(min=1, max=150),validators.Optional()])

class CreateFAQForm(Form):
    question = StringField('Question', [validators.Length(min=1,max=800), validators.DataRequired(message="This field is required")])
    answer = StringField('Answer', [validators.Length(min=1,max=800), validators.DataRequired(message="This field is required")])
    create_date = DateField('Date Updated/Created', format="%Y-%m-%d", default=datetime.datetime.now())

class CreateFeedbackForm(Form):
    product_name = StringField('Product Name', [validators.Length(min=1, max=50), validators.DataRequired(message='String only')])
    title = StringField('Title', [validators.Length(min=1, max=50), validators.DataRequired(message='String only')])
    rating = SelectField('Rating',[validators.DataRequired()], choices=[('1','1 Star'),('2','2 Stars'),('3','3 Stars'),('4','4 Stars'),('5','5 Stars')])
    fit = SelectField('How was the fit of product? ', [validators.DataRequired()], choices=[('Runs Small', 'Smaller than expected'), ('True to size', 'True to size'), ('Runs Large', 'Larger than expected')], default='')
    quality = SelectField('How was the quality of the product?', [validators.DataRequired()], choices=[('Low Quality', 'Low Quality'), ('Normal Quality', 'Normal Quality'), ('High Quality', 'High Quality')], default='')
    description = TextAreaField("Addtional feedback", [validators.Length(min=1, max=150),validators.Optional()])
    create_by = StringField('Create By', [validators.Length(min=1, max=50), validators.DataRequired(message='String only')])
    create_date = DateField('Date Updated/Created', format="%Y-%m-%d", default=datetime.datetime.now())

class CreateDeliveryFeedbackForm(Form):
    email_address = StringField('Email Address', [validators.Email(), validators.DataRequired(message='Please enter a valid email')])
    rating = RadioField('Rating',[validators.DataRequired()], choices=[('1','1 Star'),('2','2 Stars'),('3','3 Stars'),('4','4 Stars'),('5','5 Stars')])
    product = StringField('Product Name', [validators.Length(min=1, max=50), validators.DataRequired(message='String only')])
    message1 = RadioField('Was the delivery person polite and courteous?', [validators.DataRequired()], choices=[('Yes', 'Yes, was polite and courteous'), ('Soso', 'Somewhat'), ('No', 'No, was rude')], default='Yes')
    message2 = RadioField('Was the box size and pakaging appropriate for the items?', [validators.DataRequired()], choices=[('Too Small', 'Too Small'), ('About Right', 'About Right'), ('Too Big', 'Too big')], default='About Right')
    message3 = RadioField('Was the item difficult to open?', [validators.DataRequired()], choices=[('Yes', 'Yes'), ('No', 'No')], default='Yes')
    message4 = RadioField('Was the process of receiving delivery quick and hassle-free?', [validators.DataRequired()], choices=[('Yes', 'Yes, It was quick and simple'),('No', 'No, not as convenient as expected')], default='Yes')
    remarks = TextAreaField('Remarks', [validators.Length(min=1, max=150),validators.Optional()])
    create_date= DateField('Date Of Creation', [validators.DataRequired()],format="%Y-%m-%d", default=datetime.datetime.now())
    

class Register_AdminForm(Form):
    username =  StringField('User Name', [validators.Length(min=1, max=10), validators.DataRequired()])
    email = StringField('Email address', [validators.DataRequired(),validators.Length(min=4, max=150, message='Please enter a valid email'),validators.Email()])
    gender = RadioField('Gender', [validators.DataRequired()], choices=[('F', 'Female'), ('M', 'Male')], default='F')
    roles =  SelectField('Roles', [validators.DataRequired(message='Please choose your roles')], choices=[('', 'N/A'), ('Front-End Management', 'Front-End Management'),('Inventory Manegement', 'Inventory Manegement'), ('Order Manegement', 'Order Manegement'),('Super Admin', 'Super Admin')], default='')
    status = SelectField('Account Status', [validators.DataRequired()], choices=[('Enabled', 'Enabled'), ('Disabled', 'Disabled')] ,default='Enabled')
    create_date= DateField("Sign Up Date",[validators.DataRequired()],format="%Y-%m-%d", default=datetime.datetime.now())
    password = PasswordField('Password', [validators.InputRequired(), validators.Length(min=1,max=100),validators.EqualTo('confirm', message='passwords must match')])
    confirm = PasswordField("Confirm Password", validators=[validators.DataRequired(message="Please Fill This Field")])

class Login_AdminForm(Form):
    email = EmailField('', [validators.Length(min=1, max=150), validators.DataRequired()], render_kw={"placeholder": "Email Address"})
    password = StringField('', [validators.DataRequired()], widget=PasswordInput(hide_value=False), render_kw={"placeholder": "Password"})

class UpdateAdminForm(Form):
    username =  StringField('User Name', [validators.Length(min=1, max=10), validators.DataRequired()])
    email = StringField('Email address', [validators.DataRequired(),validators.Length(min=4, max=150, message='Please enter a valid email'),validators.Email()])
    gender = RadioField('Gender', [validators.DataRequired()], choices=[('F', 'Female'), ('M', 'Male')], default='F')
    roles =  SelectField('Roles', [validators.DataRequired(message='Please choose your roles')], choices=[('', 'N/A'), ('Front-End Management', 'Front-End Management'),('Inventory Manegement', 'Inventory Manegement'), ('Order Manegement', 'Order Manegement'),('Super Admin', 'Super Admin')], default='')
    create_date= DateField("Sign Up Date",[validators.DataRequired()],format="%Y-%m-%d", default=datetime.datetime.now())
    password = PasswordField('Password', [validators.InputRequired(), validators.Length(min=1,max=100),validators.EqualTo('confirm', message='passwords must match')])
    confirm = PasswordField("Confirm Password", validators=[validators.DataRequired(message="Please Fill This Field")])

class CreateContactForm(Form):
    first_name = StringField('First Name', [validators.Length(min=1, max=150), validators.DataRequired(message="Please Fill This Field")])
    last_name = StringField('Last Name', [validators.Length(min=1, max=150), validators.DataRequired(message="Please Fill This Field")])
    email = StringField('Email Address', [validators.Email(), validators.DataRequired(message='Please enter a valid email')])
    subject = SelectField('Subject', [validators.DataRequired()], choices=[('Select'), ('Cheongsam Adjustment'), ('Sizing'), ('Appointment'), ('Others')], default='')
    message = TextAreaField('Message', [validators.DataRequired(message="Please Fill This Field")])

class CreateContactReplyForm(Form):
    reply = TextAreaField('Reply', [validators.DataRequired(message="Please Fill This Field")])
    create_by = StringField('Admin', [validators.Length(min=1, max=150), validators.DataRequired()])
    create_date = create_date= DateField('Date Updated/Created', [validators.DataRequired()],format="%Y-%m-%d", default=datetime.datetime.now())

    
