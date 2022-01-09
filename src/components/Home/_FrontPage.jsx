import Env from '../Env'

const FrontPage = () => {

    return (
        <>
            <div class="main-content bg-default g-sidenav-show g-sidenav-pinned">
                <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
                    <div class="container">
                        <div class="header-body text-center md-5">
                            <div class="row justify-content-center">
                                <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                                    <h1 class="text-white display-3">Welcome To {Env.AppName}</h1>
                                    <p class="text-lead text-white">Turn your traffic into profit.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="separator separator-bottom separator-skew zindex-100">
                        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                        </svg>
                    </div>
                </div>
                <div class="front-con">
                    <br />
                    <br />
                    <div className="row">
                        <div>
                            <h1 class="text-white display-2">
                                Make Short Link And Earn Money
                            </h1>
                            <p className="text-white">{Env.AppName} is a free, Simple way to earn money by sharing links with your audience.</p>

                            <h1 className="display-2 text-white ">How It Works</h1>
                            <p class="text-lead text-white">{Env.AppName} is a completely free tool where you can create short links, which apart from being free, you get paid!</p>
                            <br />
                            <h1 class="display-4 text-gray">CREATE AN ACCOUNT</h1>
                            <p class="text-white">In order to get started with {Env.AppName}, at first all you need is {Env.AppName} Account & you can create it by sign-up option.</p>

                            <h1 class="display-4 text-gray">SHORTEN YOUR LINK'S</h1>
                            <p class="text-white">Shorten that links with {Env.AppName} you want to share, you can use Link Shorten option given in Dashboard</p>

                            <h1 class="display-4 text-gray">SHARE LINKS</h1>
                            <p class="text-white">Now your'e ready with your shorten links, just copy them and start sharing on any platform you have community e.g: YouTube, Telegram, Website etc.</p>

                            <h1 class="display-4 text-gray">EARN MONEY</h1>
                            <p class="text-white">Here you Go, since you've shared your Shorten links and got views on it, So that you're getting paid for every view you get.</p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default FrontPage