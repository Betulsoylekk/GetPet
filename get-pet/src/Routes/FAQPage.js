import classes from "./FAQPage.module.css";
import { useState } from "react";
const FAQPage = () => {
  const [post, setPost] = useState(0);
  const showPage = (index) => {
    setPost(index);
  };
  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Frequently Asked Questions</h1>
      <div className={classes.pagesList}>
        <button onClick={() => showPage(0)} className={classes.pageButton}>
          Cats 101
        </button>
        <button onClick={() => showPage(1)} className={classes.pageButton}>
          What Do Birds Eat?
        </button>
      </div>
      <div className={classes.innerContainer}>
        {post === 0 && (
          <div className={classes.currentPage}>
            <h1 className={classes.pageTitle}>
              Cats 101: Basic Health & Care Tips to Keep Your Cat Healthy
            </h1>
            <p className={classes.pageText}>
              A healthy cat is a happy cat! In observance of National Cat Health
              Month, we're sharing some tips for keeping your feline family
              members in good health. Whether your buddy is a playful kitten or
              a seasoned senior cat, here are 10 ways to keep your cat healthy.{" "}
            </p>
            <h2>1.Groom Your Cat Regularly.</h2>
            <p className={classes.pageText}>
              You might be thinking, “but don't cats groom themselves?” While
              cats are known for their cleanliness, some extra help from you can
              take their health and hygiene to the next level! Short-haired,
              medium-haired and long-haired cats can all benefit from regular
              brushing. This helps remove loose hair from the coat, preventing
              shedding and hairballs. In addition to practical benefits, regular
              grooming can be a wonderful way to bond with your cat!
            </p>
            <h2> 2. Provide Fresh Water 24/7 </h2>
            <p className={classes.pageText}>
              Just as it is for us, drinking enough water is essential for our
              cats' health. Proper hydration can keep your cat comfortable and
              happy by helping to prevent common cat health issues like urinary
              tract infections and kidney disease. Many cats are picky about the
              water they drink. If you've ever caught your cat sipping from the
              sink or pawing at her water bowl, chances are she prefers moving
              water. This is a common and natural preference among cats! You can
              give your cat the fresh, flowing water she prefers and encourage
              her to drink, boosting her hydration, with a pet fountain.
            </p>
            <h2>3. Make Sure Your Cat Always Has A Place To Potty</h2>
            <p className={classes.pageText}>
              Should you have more than one litter box? Maybe! A general rule of
              thumb is to provide one for each cat in your home, plus one more.
              So, ideally, if you have two cats, you should have three litter
              boxes. This way, there's always an alternative available in case
              your cat doesn't feel like using her usual box for some reason.
              Speaking of which, be mindful of where you place a litter box.
              Make sure it's somewhere that your cat can always access, and
              where she'll feel comfortable letting her guard down when nature
              calls.
            </p>
            <h2>4. Keep The Litter Box Clean</h2>
            <p className={classes.pageText}>
              No one likes a dirty restroom. Many cats will find another place
              to go (like the carpet... or your pillow) if their litter box
              hasn't been cleaned in a while. With a traditional litter box, you
              should try to scoop at least once daily and clean the entire box
              at least once a week. If you're not a fan of scooping poop (who
              is?), a self-cleaning litter box is a life-changer, saving you
              from the stinky chore while giving your cat the consistently clean
              litter box she deserves. If you do notice your cat is suddenly
              going outside the litter box, especially when it's clean, check
              with your vet – this can sometimes be a sign of medical issues.
            </p>
            <h2>5. Train Your Cat To Use A Scratching Post</h2>
            <p className={classes.pageText}>
              Scratching is a natural, healthy and important behavior for cats.
              Unfortunately, in our homes this healthy behavior can come at a
              cost to our décor. Regular scratching on an appropriate surface
              such as carpet, sisal, or cardboard helps remove the old layers
              from your cat's claws. Not only will this help prevent damage to
              your furniture, it will help your cat stretch her muscles and keep
              her claws in top condition. While it may take some time to
              introduce your cat to a scratching post or board, it's well worth
              the effort. Your cat (and your couch) will thank you!
            </p>
            <h2>6. Use A Cat Carrier In The Car</h2>
            <p className={classes.pageText}>
              Does your cat need to visit the vet? Or are you bringing her along
              on vacation? Always transport your cat in an appropriate carrier
              designed for pets. Allowing your cat to roam freely in the car can
              distract you from driving safely, which can lead to accidents that
              may harm both you and your cat.
            </p>
            <h2>7. Maintain A Healthy Diet And Weight</h2>
            <p className={classes.pageText}>
              Just like humans, dogs, and many other animals, cats can
              experience health issues if they become overweight. And just like
              us, the keys to a healthy weight are diet and exercise. To
              maintain a healthy diet, talk to your vet about which food is best
              for your cat. If your vet recommends a dry food (kibble) diet,
              consider an automatic pet feeder to help maintain a consistent
              routine and portion control. And when it comes to exercise, cat
              toys are a fun way to keep your cat's mind and body active. By
              engaging your cat's natural predator instincts, many cat toys make
              your cat's inner tiger happy while also keeping her slim and trim.
            </p>
            <h2>8. Consider Spaying Or Neutering Your Cat</h2>
            <p className={classes.pageText}>
              Reproductive diseases can be serious, and affect both male and
              female cats. Spaying prevents uterine infections and ovarian
              cancers, and reduces the risk of mammary tumors in female cats,
              while neutering prevents testicular cancer and some prostate
              problems in males. Neutering also reduces a male cat's urge to
              roam, reducing the risk of getting lost or injured away from home.
              And of course, spaying and neutering helps cats everywhere by
              reducing the number of homeless cats in shelters. In general, a
              “fixed” pet is usually a healthier, happier pet, but your vet can
              help you decide what is best for your cat.
            </p>
            <h2>9. Choose A Cat-Friendly Vet</h2>
            <p className={classes.pageText}>
              Did you know there are some doctors who exclusively see feline
              patients? It seems to go without saying that cats are not smaller
              versions of dogs. That said, it follows that cats have different
              veterinary requirements than dogs do. A veterinarian specializing
              in feline health and behavior can be a valuable ally in keeping
              your cat healthy and happy for a lifetime. You can find a feline
              vet in your area by visiting the American Association of Feline
              Practitioners.
            </p>
            <h2>10. Schedule regular veterinary visits</h2>
            <p className={classes.pageText}>
              Even if your cat seems healthy, you should visit the vet at least
              once a year. Annual visits give the vet a chance to catch any
              potential health issues in their early stages, administer
              vaccines, and clean your cat's teeth. Your vet can also tell you
              if your cat is at a healthy weight. And of course, if your cat
              seems sick or you notice any changes to appetite, litter box use
              or activity, it's always best to consult your vet. These tips are
              just the basics. Keeping our feline friends healthy, safe and
              happy is a full-time job! But we know it's worth every bit of
              effort to return the love our cats give us every day. For the care
              you give, your cat will reward you with a lifetime of
              companionship and joy.
            </p>
            <a href="https://www.petsafe.net/learn/cats-101-basic-health-care-tips-to-keep-your-cat-healthy">
              You can reach the original post from here!
            </a>
          </div>
        )}
        {post === 1 && (
          <div className={classes.currentPage}>
            <h1 className={classes.pageTitle}>What Do Birds Eat?</h1>
            <p className={classes.pageText}>
              It depends on the bird and the time of the year. Some eat seeds,
              berries, fruit, insects, other birds, eggs, small mammals, fish,
              buds, larvae, aquatic invertebrates, acorns and other nuts,
              aquatic vegetation, grain, dead animals, garbage, and much more…
              During the spring and summer months, most songbirds eat mainly
              insects and spiders. Insects are easy to find and catch, and are
              very nutritious. During fall and winter, however, birds that don’t
              migrate must eat fruits and seeds to survive.{" "}
            </p>
            <h2>Did you know?</h2>
            <p className={classes.pageText}>
              Cedar Waxwings can become drunk (and may even die from alcohol
              intoxication) after eating fermented fruit in the spring. It’s
              great fun to feed birds. Even in cities you may be able to attract
              birds to your home or apartment by feeding them. In urban areas we
              recommend tube feeders filled with black-oil sunflower seed (these
              seeds attract the greatest number of species, are nutritious, high
              in fat, and their small size and thin shells make them easy for
              small birds to handle and crack). Another favorite is nyger seed
              (this seed is expensive — so feed it in a special nyger feeder so
              it is not wasted). This seed attracts finches.
            </p>{" "}
            <p className={classes.pageText}>
              If rodents are a problem in your neighborhood make sure that you
              clean-up any spilled seeds from the feeders. Place your feeders
              within three feet of a window (or more than 30 feet away) to
              reduce the number of birds that die from hitting your windows.
            </p>
            <p className={classes.pageText}>
              If you are not allowed to have feeders in your apartment building,
              try a natural bird feeder. Plant seed bearing plants like dwarf
              sunflowers, cosmos, and asters in pots (or any container that
              holds some soil and has holes in the bottom for drainage) and
              provide bright red or orange tubular flowers for hummingbirds.
              Learn more about feeding birds the “natural way.”
            </p>
            <a href="https://celebrateurbanbirds.org/faq/what-do-birds-eat/">
              You can reach the original post from here!
            </a>
          </div>
        )}

        {/* <div className={classes.askBox}>
          <form className={classes.form}>
            <label className={classes.label}>Ask Us Anything!</label>
            <textarea
              rows="10"
              cols="50"
              className={classes.textArea}
            ></textarea>
          </form>
          <button className={classes.askButton}>Send</button>
        </div> */}
      </div>
    </div>
  );
};
export default FAQPage;
