import React, { useState } from 'react'

const initialState = {
  userName: '',
  titleName: '',
  email: '',
  phone: '',
  description: ''
}

export default function Contact() {

  const [state, setState] = useState(initialState)

  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = e => {

    e.preventDefault()

    console.log(state);
    setState(initialState)
  }

  return (
    <>

      <div className='p-3'>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3399.022055496452!2d73.48288377452734!3d31.578443044272476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1689145918140!5m2!1sen!2s"
          width="100%"
          height="500"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
          title='map'
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>

      <div className='my-4 my-lg-5'>
        <div className="container">
          <div className="row">

            {/* Asked Question */}
            <div className="col-12 col-lg-6 pe-lg-5">

              <h6 className='text-muted'>INFORMATION QUESTIONS</h6>
              <h4 className='fw-bold mb-4 text-info'>FREQUENTLY ASKED QUESTIONS</h4>

              <div className="accordion accordion-flush" id="accordionFlushExample">
                <div className="accordion-item">

                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed text-muted" type="button" data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      How do I start the rental application process?
                    </button>
                  </h2>

                  <div id="flush-collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body text-muted" style={{ textAlign: 'justify' }}>
                      To begin the rental application process, you typically need to complete an application form
                      provided by the landlord or property management. This form will ask for personal information,
                      rental history, employment details, and possibly references. Make sure to provide accurate
                      and complete information to enhance your chances of approval.
                    </div>
                  </div>
                </div>

                <div className="accordion-item pt-4">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed text-muted" type="button" aria-expanded="false"
                      data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-controls="flush-collapseTwo">
                      Is there an application fee, and is it refundable?
                    </button>
                  </h2>

                  <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body text-muted" style={{ textAlign: 'justify' }}>
                      Many rental applications require an application fee to cover the costs of processing and screening.
                      The fee is typically non-refundable, even if your application is not approved. However, it's best
                      to check with the landlord or property management to confirm their specific policy.
                    </div>
                  </div>
                </div>

                <div className="accordion-item pt-4">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed text-muted" type="button" aria-expanded="false"
                      data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-controls="flush-collapseThree">
                      What should I do if there are maintenance issues in the rental property?
                    </button>
                  </h2>

                  <div id="flush-collapseThree" className="accordion-collapse collapse text-muted" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body text-muted" style={{ textAlign: 'justify' }}>
                      If you encounter maintenance issues, report them to the landlord or property management as soon
                      as possible. Provide a clear and detailed description of the problem. It is the landlord's
                      responsibility to address maintenance and repair issues in a timely manner.
                    </div>
                  </div>
                </div>

              </div>
            </div>


            {/* Contact Form */}
            <div className="col-12 col-lg-6 mt-4 mt-lg-0">

              <h6 className='text-muted'>INFORMATION ABOUT US</h6>
              <h4 className='fw-bold mb-4 text-info'>CONTACT US FOR ANY QUESTIONS</h4>

              <div className="row">
                <div className="col-12 col-md-6">
                  <input type="text" className='form-control contact-form' name='userName' value={state.userName}
                    onChange={handleChange} placeholder='Enter Name' />
                </div>

                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <input type='text' className='form-control contact-form' name='titleName' value={state.titleName}
                    placeholder='Title Name' onChange={handleChange} />
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-12 col-md-6">
                  <input type="email" className='form-control contact-form' name='email' value={state.email}
                    onChange={handleChange} placeholder='Enter Email' />
                </div>

                <div className="col-12 col-md-6 mt-3 mt-md-0">
                  <input type='text' className='form-control contact-form' placeholder='Enter Phone Number'
                    name='phone' value={state.phone} onChange={handleChange} />
                </div>
              </div>

              <div className="row mt-3 mt-md-4">
                <div className="col">
                  <textarea className="form-control rounded-0" placeholder='Description' name='description'
                    value={state.description} onChange={handleChange} rows="5" style={{ resize: 'none' }}></textarea>
                </div>
              </div>

              <div className="row mt-3 mt-md-4">
                <div className="col">
                  <button className='btn btn-1' onClick={handleSubmit}>SEND QUESTION</button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </>
  )
}
