import React from 'react'

export default function About() {
    return (
        <>
            <div className='p-4 p-lg-5'>

                <div className='about-img'>
                    <div className='overlay'>

                        <div className="mx-3 mx-sm-2 mx-md-3 mx-lg-4 content-center" style={{ height: '60vh' }}>
                            <div className='p-sm-5 text-primary text-transrom-uppercase'>
                                <h4 style={{ textAlign: 'justify', opacity: 0.8 }}>Online Rental Haven is an online platform that
                                    provides information about rental properties available for lease or rent.</h4>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='py-5'>
                    <h2 className='fw-bold text-info mb-3'>Categories</h2>
                    <p className='text-muted'>Categories of online rental haven plateform are Properties (Flat, Shop,
                        House, Plaza, Hostel, Event Space, and Parking Space), Vehicles (Car, Van, Bus, Boat, Truck,
                        Bicycle, and Motorcycle), Electronics (Laptop, Tablet, Camera, Heater, Television, Smartphone,
                        Printer, Projector, Sound System, and Air Conditioner), Household (Furniture, Appliance, Home
                        Decor, Kitchenware, Mobility Aid, Vacuum Cleaner, Musical Instrument, Exercise Equipment, and
                        Projector and Screen), HumanWorkers (Event Staff, IT Consultant, Photographer, Videographer,
                        Catering Service, Cleaning Service, Personal Trainer, Freelance Writer, Virtual Assistant,
                        Graphic Designer, Language Translator, Construction Worker, and Landscaping Service) and
                        Necessities (Art and Props, Clothes and Costumes, Sports and Recreation, and Educational
                        Resources).</p>
                </div>

                <div>
                    <h2 className='fw-bold text-info mb-3'>About Us</h2>
                    <p className='text-muted'>Online Rental Haven is an online platform that provides information about
                        rental properties available for lease or rent. The plateform serves as a marketplace where property
                        owners can list their rental properties and prospective tenants/renters can search and browse for
                        properties that meet their needs. The plateform typically includes a range of features and tools
                        that help streamline the rental process for both property owners and tenants. These features may
                        include list, edit and delete properties, and search filters based on title Name, property type,
                        location, price range and property condition as well as online rental applications, and payment
                        processing.</p>
                </div>

            </div>
        </>
    )
}
